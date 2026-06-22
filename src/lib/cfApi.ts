const CF_BASE = "https://codeforces.com/api";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// Backoff delays before each retry on HTTP 429: 3 s, 7 s, 15 s (max 3 retries).
const CF_RATE_LIMIT_BACKOFF_MS = [3_000, 7_000, 15_000] as const;
const CF_RATE_LIMIT_MAX_RETRIES = 3;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

// In-memory cache (persists across requests in same Node.js process)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, CacheEntry<any>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCached<T>(key: string, data: T): void {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// Global rate-limit state
let lastCfRequest = 0;

async function cfFetch<T>(endpoint: string): Promise<T> {
  const elapsed = Date.now() - lastCfRequest;
  if (elapsed < 2100) await sleep(2100 - elapsed);
  lastCfRequest = Date.now();

  const url = `${CF_BASE}/${endpoint}`;

  for (let attempt = 0; attempt <= CF_RATE_LIMIT_MAX_RETRIES; attempt++) {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": "SolveX/1.0 (codeforces analysis tool)" },
    });

    if (res.status === 429) {
      if (attempt >= CF_RATE_LIMIT_MAX_RETRIES) {
        throw new Error(
          "CODEFORCES_RATE_LIMITED: Codeforces is rate-limiting requests. Please wait a few minutes and try again."
        );
      }
      await sleep(CF_RATE_LIMIT_BACKOFF_MS[attempt]);
      continue;
    }

    if (!res.ok) throw new Error(`Codeforces returned HTTP ${res.status}`);

    const json = (await res.json()) as { status: string; result?: T; comment?: string };

    if (json.status !== "OK") {
      throw new Error(json.comment ?? "Codeforces API returned FAILED");
    }

    return json.result as T;
  }

  throw new Error(
    "CODEFORCES_RATE_LIMITED: Codeforces is rate-limiting requests. Please wait a few minutes and try again."
  );
}

// ─── Public API types ────────────────────────────────────────────────────────

export interface CFUserInfo {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  country?: string;
  organization?: string;
  avatar?: string;
  titlePhoto?: string;
}

export interface CFSubmission {
  id: number;
  contestId?: number;
  problem: {
    contestId?: number;
    index: string;
    name: string;
    type: string;
    rating?: number;
    tags: string[];
  };
  programmingLanguage: string;
  verdict?: string;
  creationTimeSeconds?: number;
}

// ─── Public fetch functions ──────────────────────────────────────────────────

export async function fetchUserInfo(handle: string): Promise<CFUserInfo> {
  const key = `userinfo:${handle.toLowerCase()}`;
  const hit = getCached<CFUserInfo>(key);
  if (hit) return hit;

  const result = await cfFetch<CFUserInfo[]>(
    `user.info?handles=${encodeURIComponent(handle)}`
  );
  const user = result[0];
  setCached(key, user);
  return user;
}

export async function fetchUserSubmissions(
  handle: string
): Promise<CFSubmission[]> {
  const key = `subs:${handle.toLowerCase()}`;
  const hit = getCached<CFSubmission[]>(key);
  if (hit) return hit;

  const result = await cfFetch<CFSubmission[]>(
    `user.status?handle=${encodeURIComponent(handle)}&from=1&count=10000`
  );
  setCached(key, result);
  return result;
}
