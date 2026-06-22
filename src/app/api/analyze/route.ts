import { NextRequest, NextResponse } from "next/server";
import { fetchUserInfo, fetchUserSubmissions } from "@/lib/cfApi";
import { analyze } from "@/lib/cfAnalysis";
import type { AnalysisResult } from "@/lib/cfAnalysis";

export const runtime = "nodejs"; // needs setTimeout for rate limiting

// Analysis result cache — keyed by lowercase handle.
// Persists within the Node.js process; cleared on server restart.
const ANALYSIS_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

interface AnalysisCacheEntry {
  result: AnalysisResult;
  cachedAt: number;
}
const analysisCache = new Map<string, AnalysisCacheEntry>();

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get("handle")?.trim();

  if (!handle) {
    return NextResponse.json(
      { error: "handle parameter is required" },
      { status: 400 }
    );
  }

  const cacheKey = handle.toLowerCase();

  try {
    // Fetch sequentially to respect CF 1 req / 2 s rate limit
    const userInfo    = await fetchUserInfo(handle);
    const submissions = await fetchUserSubmissions(handle);

    const result = analyze(userInfo, submissions);

    // Cache fresh result for 429 fallback
    analysisCache.set(cacheKey, { result, cachedAt: Date.now() });

    return NextResponse.json(result, {
      headers: {
        // Let the browser cache for 5 min, CDN for 10 min
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
      },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected error during analysis";

    const isRateLimited =
      message.includes("CODEFORCES_RATE_LIMITED") ||
      message.includes("429");

    const isUnavailable =
      !isRateLimited &&
      (message.includes("502") || message.includes("503") ||
       message.includes("Bad Gateway") || message.includes("unavailable"));

    if (isRateLimited || isUnavailable) {
      // Serve cached result if still within TTL window
      const cached = analysisCache.get(cacheKey);
      if (cached && Date.now() - cached.cachedAt < ANALYSIS_CACHE_TTL_MS) {
        return NextResponse.json({
          ...cached.result,
          from_cache: true,
          cache_warning: isRateLimited
            ? "Codeforces is rate-limiting requests. Showing the latest cached analysis instead."
            : "Codeforces API is temporarily unavailable. Showing the latest cached analysis instead.",
        });
      }

      if (isRateLimited) {
        return NextResponse.json(
          {
            error: "Codeforces is rate-limiting requests. Please wait 1–2 minutes and try again.",
            error_code: "CODEFORCES_RATE_LIMITED",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: "Codeforces API is temporarily unavailable. Try again later.",
          error_code: "CODEFORCES_UNAVAILABLE",
        },
        { status: 502 }
      );
    }

    // Handle not-found separately
    const isNotFound =
      message.includes("not found") ||
      message.includes("FAILED") ||
      message.includes("handle");

    return NextResponse.json(
      { error: message },
      { status: isNotFound ? 404 : 502 }
    );
  }
}
