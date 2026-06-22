import type { CFUserInfo, CFSubmission } from "./cfApi";

// ─── Verdict constants ───────────────────────────────────────────────────────
const V_AC  = "OK";
const V_WA  = "WRONG_ANSWER";
const V_TLE = "TIME_LIMIT_EXCEEDED";
const V_RE  = "RUNTIME_ERROR";
const V_CE  = "COMPILE_ERROR";
const V_MLE = "MEMORY_LIMIT_EXCEEDED";

// Tags with too few problems or meta-only tags to skip
const SKIP_TAGS = new Set(["*special", "interactive"]);
const MIN_PROBLEMS = 3;
const MIN_SUBS = 5;

// ─── Output types ────────────────────────────────────────────────────────────

export interface FrictionArea {
  tag: string;
  solved: number;
  attempted: number;
  totalSubmissions: number;
  waCount: number;
  tleCount: number;
  reCount: number;
  avgAttemptsBeforeAC: number;
  solveRate: number;
  frictionScore: number;
  issue: string;
  action: string;
  confidence: "high" | "medium" | "low";
  color: string;
}

export interface StrongTopic {
  tag: string;
  solved: number;
  solveRate: number;
  avgAttempts: number;
}

export interface RecommendedProblem {
  name: string;
  rating: number;
  tags: string[];
  reason: string;
  contestId?: number;
  index?: string;
}

export interface QueueDay {
  day: number;
  focus: string;
  problemName?: string;
  rating: number;
  reason: string;
  tagColor: string;
}

export interface AnalysisResult {
  handle: string;
  profile: {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    country: string;
    organization: string;
  };
  summary: {
    totalSubmissions: number;
    uniqueSolved: number;
    mainLanguage: string;
    avgSolvedRating: number;
  };
  diagnosis: string;
  frictionAreas: FrictionArea[];
  strongTopics: StrongTopic[];
  errorBreakdown: {
    wrongAnswer: number;
    timeLimitExceeded: number;
    runtimeError: number;
    compileError: number;
    memoryLimitExceeded: number;
    other: number;
  };
  ratingComfortZone: {
    min: number;
    max: number;
    sweet: number;
  };
  recommendedProblems: RecommendedProblem[];
  sevenDayQueue: QueueDay[];
}

// ─── Tag → color mapping ─────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  "constructive algorithms": "#FF4D6D",
  "implementation":          "#00F5A0",
  "math":                    "#FACC15",
  "greedy":                  "#00D9F5",
  "dp":                      "#f97316",
  "dynamic programming":     "#f97316",
  "data structures":         "#a78bfa",
  "graphs":                  "#00D9F5",
  "trees":                   "#00F5A0",
  "brute force":             "#8A9A96",
  "binary search":           "#00D9F5",
  "sorting":                 "#FACC15",
  "number theory":           "#FACC15",
  "strings":                 "#f97316",
  "geometry":                "#a78bfa",
  "dfs and similar":         "#00D9F5",
  "games":                   "#FACC15",
  "shortest paths":          "#00D9F5",
  "two pointers":            "#00F5A0",
  "bitmasks":                "#f97316",
  "combinatorics":           "#FACC15",
};

function tagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] ?? "#8A9A96";
}

function capitalize(s: string): string {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Problem-level stats ─────────────────────────────────────────────────────

interface ProblemStats {
  key: string;
  name: string;
  rating: number | undefined;
  tags: string[];
  subs: CFSubmission[];
  solved: boolean;
  attemptsBeforeAC: number;
}

function problemKey(sub: CFSubmission): string {
  const cid = sub.problem.contestId ?? sub.contestId ?? 0;
  return `${cid}:${sub.problem.index}`;
}

function buildProblemMap(subs: CFSubmission[]): Map<string, ProblemStats> {
  const map = new Map<string, ProblemStats>();

  for (const sub of subs) {
    const key = problemKey(sub);
    if (!map.has(key)) {
      map.set(key, {
        key,
        name: sub.problem.name,
        rating: sub.problem.rating,
        tags: sub.problem.tags,
        subs: [],
        solved: false,
        attemptsBeforeAC: 0,
      });
    }
    map.get(key)!.subs.push(sub);
  }

  // CF returns subs newest-first; reverse per-problem to get chronological order
  for (const ps of map.values()) {
    ps.subs.reverse();
    let attempts = 0;
    for (const s of ps.subs) {
      attempts++;
      if (s.verdict === V_AC) {
        ps.solved = true;
        ps.attemptsBeforeAC = attempts;
        break;
      }
    }
  }

  return map;
}

// ─── Main analysis function ──────────────────────────────────────────────────

export function analyze(
  user: CFUserInfo,
  submissions: CFSubmission[]
): AnalysisResult {
  const problemMap = buildProblemMap(submissions);
  const allProblems = [...problemMap.values()];

  // ── Language stats ──────────────────────────────────────────────────────────
  const langCount: Record<string, number> = {};
  for (const sub of submissions) {
    if (sub.verdict === V_AC) {
      const lang = sub.programmingLanguage.split(" ")[0];
      langCount[lang] = (langCount[lang] ?? 0) + 1;
    }
  }
  const mainLanguage =
    Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Unknown";

  // ── Solved stats ────────────────────────────────────────────────────────────
  const solvedProblems = allProblems.filter((p) => p.solved);
  const uniqueSolved = solvedProblems.length;
  const ratedSolved = solvedProblems.filter(
    (p) => typeof p.rating === "number" && p.rating > 0
  );
  const avgSolvedRating =
    ratedSolved.length > 0
      ? Math.round(
          ratedSolved.reduce((s, p) => s + (p.rating ?? 0), 0) /
            ratedSolved.length
        )
      : 0;

  // ── Error breakdown ─────────────────────────────────────────────────────────
  const errorBreakdown = {
    wrongAnswer: 0,
    timeLimitExceeded: 0,
    runtimeError: 0,
    compileError: 0,
    memoryLimitExceeded: 0,
    other: 0,
  };
  for (const sub of submissions) {
    switch (sub.verdict) {
      case V_WA:  errorBreakdown.wrongAnswer++;        break;
      case V_TLE: errorBreakdown.timeLimitExceeded++;  break;
      case V_RE:  errorBreakdown.runtimeError++;       break;
      case V_CE:  errorBreakdown.compileError++;       break;
      case V_MLE: errorBreakdown.memoryLimitExceeded++; break;
      case V_AC:  break;
      default:
        if (sub.verdict) errorBreakdown.other++;
    }
  }

  // ── Tag analysis ────────────────────────────────────────────────────────────
  const tagProblems = new Map<string, ProblemStats[]>();

  for (const ps of allProblems) {
    for (const tag of ps.tags) {
      if (SKIP_TAGS.has(tag)) continue;
      if (!tagProblems.has(tag)) tagProblems.set(tag, []);
      tagProblems.get(tag)!.push(ps);
    }
  }

  const frictionAreas: FrictionArea[] = [];
  const strongTopics: StrongTopic[] = [];

  for (const [tag, problems] of tagProblems) {
    if (problems.length < MIN_PROBLEMS) continue;
    const totalSubs = problems.reduce((s, p) => s + p.subs.length, 0);
    if (totalSubs < MIN_SUBS) continue;

    const solved   = problems.filter((p) => p.solved).length;
    const attempted = problems.length;
    const waCount  = problems.reduce(
      (s, p) => s + p.subs.filter((sub) => sub.verdict === V_WA).length, 0
    );
    const tleCount = problems.reduce(
      (s, p) => s + p.subs.filter((sub) => sub.verdict === V_TLE).length, 0
    );
    const reCount  = problems.reduce(
      (s, p) => s + p.subs.filter((sub) => sub.verdict === V_RE).length, 0
    );

    const solvedWithData = problems.filter(
      (p) => p.solved && p.attemptsBeforeAC > 0
    );
    const avgAttemptsBeforeAC =
      solvedWithData.length > 0
        ? solvedWithData.reduce((s, p) => s + p.attemptsBeforeAC, 0) /
          solvedWithData.length
        : 1;

    const solveRate  = solved / attempted;
    const waRate     = totalSubs > 0 ? waCount / totalSubs : 0;
    const tleRate    = totalSubs > 0 ? tleCount / totalSubs : 0;
    // Normalize retry penalty: (avgAttempts - 1) / 4, capped at 1
    const retryPenalty = Math.min((avgAttemptsBeforeAC - 1) / 4, 1);

    // Friction score: weighted, range ~0-100
    // WA density most important, then TLE, then retry cost, then unsolved rate
    const frictionScore =
      waRate * 40 +
      tleRate * 30 +
      retryPenalty * 20 +
      (1 - solveRate) * 10;

    if (frictionScore < 4) continue; // negligible friction

    const confidence: FrictionArea["confidence"] =
      attempted >= 20 ? "high" : attempted >= 10 ? "medium" : "low";

    // Determine dominant issue and recommended action
    let issue: string;
    let action: string;

    if (waRate > 0.3) {
      issue = "High wrong-answer rate";
      action = "Practice systematic edge-case testing";
    } else if (tleRate > 0.15) {
      issue = "High time-limit rate";
      action = "Review algorithmic complexity and optimize";
    } else if (avgAttemptsBeforeAC > 3.5) {
      issue = `Avg ${avgAttemptsBeforeAC.toFixed(1)} attempts before AC`;
      action = "Plan before coding — reduce submission trial-and-error";
    } else if (solveRate < 0.5) {
      issue = "Low solve rate";
      action = "Focus on fundamentals for this topic";
    } else if (waRate > 0.18) {
      issue = "Elevated WA count";
      action = "Add corner-case checks before each submission";
    } else {
      issue = "High retry cost";
      action = "Deliberate practice and pattern review";
    }

    frictionAreas.push({
      tag,
      solved,
      attempted,
      totalSubmissions: totalSubs,
      waCount,
      tleCount,
      reCount,
      avgAttemptsBeforeAC: parseFloat(avgAttemptsBeforeAC.toFixed(1)),
      solveRate,
      frictionScore,
      issue,
      action,
      confidence,
      color: tagColor(tag),
    });

    // Strong topics: high solve rate, low retry
    if (solveRate >= 0.8 && avgAttemptsBeforeAC <= 1.6 && attempted >= 10) {
      strongTopics.push({
        tag,
        solved,
        solveRate,
        avgAttempts: parseFloat(avgAttemptsBeforeAC.toFixed(1)),
      });
    }
  }

  frictionAreas.sort((a, b) => b.frictionScore - a.frictionScore);
  strongTopics.sort((a, b) => b.solved - a.solved);

  const topFriction = frictionAreas.slice(0, 6);
  const topStrong   = strongTopics.slice(0, 5);

  // ── Rating comfort zone ─────────────────────────────────────────────────────
  const buckets: Record<number, { solved: number; attempted: number }> = {};
  for (const ps of allProblems) {
    if (!ps.rating || ps.rating <= 0) continue;
    const b = Math.round(ps.rating / 100) * 100;
    if (!buckets[b]) buckets[b] = { solved: 0, attempted: 0 };
    buckets[b].attempted++;
    if (ps.solved) buckets[b].solved++;
  }

  const goodBuckets = Object.entries(buckets)
    .filter(([, s]) => s.attempted >= 3 && s.solved / s.attempted >= 0.6)
    .map(([r]) => parseInt(r))
    .sort((a, b) => a - b);

  const comfortMin   = goodBuckets[0] ?? 800;
  const comfortMax   = goodBuckets[goodBuckets.length - 1] ?? comfortMin + 400;
  const sweetBucket  = Object.entries(buckets).sort(
    (a, b) => b[1].solved - a[1].solved
  )[0];
  const comfortSweet = sweetBucket
    ? parseInt(sweetBucket[0])
    : Math.round((comfortMin + comfortMax) / 2 / 100) * 100;

  // ── Recommended problems ────────────────────────────────────────────────────
  const topFrictionTags = new Set(topFriction.map((a) => a.tag));
  const candidates: RecommendedProblem[] = [];

  for (const ps of allProblems) {
    const frictionTag = ps.tags.find((t) => topFrictionTags.has(t));
    if (!frictionTag) continue;

    if (!ps.solved) {
      candidates.push({
        name: ps.name,
        rating: ps.rating ?? comfortSweet,
        tags: ps.tags,
        reason: `Attempted ${ps.subs.length}× — unresolved in ${capitalize(frictionTag)}`,
        contestId: ps.subs[0]?.problem.contestId ?? ps.subs[0]?.contestId,
        index: ps.subs[0]?.problem.index,
      });
    } else if (ps.attemptsBeforeAC >= 4) {
      candidates.push({
        name: ps.name,
        rating: ps.rating ?? comfortSweet,
        tags: ps.tags,
        reason: `Solved after ${ps.attemptsBeforeAC} attempts — high retry in ${capitalize(frictionTag)}`,
        contestId: ps.subs[0]?.problem.contestId ?? ps.subs[0]?.contestId,
        index: ps.subs[0]?.problem.index,
      });
    }
  }

  candidates.sort(
    (a, b) => Math.abs(a.rating - comfortSweet) - Math.abs(b.rating - comfortSweet)
  );
  const recommendedProblems = candidates.slice(0, 8);

  // ── 7-day queue ─────────────────────────────────────────────────────────────
  const sevenDayQueue: QueueDay[] = [];
  const queueTags = topFriction.slice(0, 3).map((a) => a.tag);

  for (let day = 1; day <= 7; day++) {
    if (day === 7) {
      sevenDayQueue.push({
        day: 7,
        focus: "Review & Reinforce",
        rating: comfortSweet,
        reason: "Consolidate week's patterns and verify retention",
        tagColor: "#8A9A96",
      });
      continue;
    }
    if (day === 6) {
      const prob = candidates[5];
      sevenDayQueue.push({
        day: 6,
        focus: "Mixed Practice",
        problemName: prob?.name,
        rating: prob?.rating ?? comfortSweet,
        reason: "Cross-tag practice to consolidate patterns",
        tagColor: "#8A9A96",
      });
      continue;
    }

    const tag  = queueTags[(day - 1) % Math.max(queueTags.length, 1)] ?? "implementation";
    const prob = candidates[day - 1];
    const area = topFriction.find((a) => a.tag === tag);

    sevenDayQueue.push({
      day,
      focus: capitalize(tag),
      problemName: prob?.name,
      rating: prob?.rating ?? comfortSweet,
      reason: area?.issue ?? "Friction area",
      tagColor: tagColor(tag),
    });
  }

  // ── Diagnosis summary ───────────────────────────────────────────────────────
  const topTag     = topFriction[0];
  const strongTag  = topStrong[0];
  const diagnosis  = topTag
    ? `${user.handle} has solved ${uniqueSolved} unique problems across ${submissions.length} submissions. ` +
      (strongTag ? `Strongest in ${capitalize(strongTag.tag)}.` : "") +
      ` Training friction appears in ${topFriction
        .slice(0, 3)
        .map((a) => capitalize(a.tag))
        .join(", ")} due to ${topTag.issue.toLowerCase()}.`
    : `${user.handle} has solved ${uniqueSolved} unique problems across ${submissions.length} submissions. No significant friction patterns detected — solid all-round performance.`;

  return {
    handle: user.handle,
    profile: {
      handle: user.handle,
      rating:    user.rating    ?? 0,
      maxRating: user.maxRating ?? 0,
      rank:      user.rank      ?? "unrated",
      maxRank:   user.maxRank   ?? "unrated",
      country:      user.country      ?? "",
      organization: user.organization ?? "",
    },
    summary: {
      totalSubmissions: submissions.length,
      uniqueSolved,
      mainLanguage,
      avgSolvedRating,
    },
    diagnosis,
    frictionAreas:   topFriction,
    strongTopics:    topStrong,
    errorBreakdown,
    ratingComfortZone: { min: comfortMin, max: comfortMax, sweet: comfortSweet },
    recommendedProblems,
    sevenDayQueue,
  };
}
