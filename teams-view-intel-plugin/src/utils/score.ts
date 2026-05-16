export const SCORE_MAX = 10;
export const SCORE_HIGH_THRESHOLD = 7.5;
export const SCORE_MID_THRESHOLD = 4;

export type ScoreColorToken = "colorTextIconSuccess" | "colorTextIconWarning" | "colorTextError";

export const scoreColor = (score: number): ScoreColorToken => {
  if (score >= SCORE_HIGH_THRESHOLD) return "colorTextIconSuccess";
  if (score >= SCORE_MID_THRESHOLD)  return "colorTextIconWarning";
  return "colorTextError";
};

export const clampScore = (score: number): number =>
  Math.min(SCORE_MAX, Math.max(0, score));

export const scorePct = (clamped: number): number =>
  (clamped / SCORE_MAX) * 100;
