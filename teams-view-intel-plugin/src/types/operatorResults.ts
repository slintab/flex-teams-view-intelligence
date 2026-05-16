export type Sentiment = {
  result: {
    label: "positive" | "negative" | "neutral";
  };
};

export type Summary = {
  result: {
    text: string;
  };
};

export type Score = {
  result: {
    reason: string;
    score: number;
  };
};

export type Script = {
  result: {
    categories: ScriptCategory[];
  };
};

export type ScriptCategory = {
  category_key: string;
  criteria: ScriptCriteria[];
};

export type ScriptCriteria = {
  criteria_key: string;
  criteria_met: "Succeeded" | "Failed";
};

export type OperatorResults = {
  score: Score;
  script: Script;
  sentiment: Sentiment;
  summary: Summary;
};
