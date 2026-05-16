import { Box } from "@twilio-paste/core/box";
import { OperatorResults } from "../../types/operatorResults";
import { SentimentBadge } from "./SentimentBadge";
import { ScriptIndicators } from "./ScriptIndicators";
import { ScoreBar } from "./ScoreBar";

type Props = {
  results: OperatorResults | null;
};

export const OperatorResultsPanel = ({ results }: Props) => (
  <Box
    paddingX="space40"
    display="flex"
    alignItems="center"
    justifyContent="center"
    columnGap="space40"
    backgroundColor="colorBackgroundWeak"
    borderBottomLeftRadius="borderRadius20"
    borderBottomRightRadius="borderRadius20"
    borderLeftStyle="solid"
    borderLeftWidth="borderWidth10"
    borderLeftColor="colorBorderWeak"
    borderBottomStyle="solid"
    borderBottomWidth="borderWidth10"
    borderBottomColor="colorBorderWeak"
    borderRightStyle="solid"
    borderRightWidth="borderWidth10"
    borderRightColor="colorBorderWeak"
    marginRight="space50"
    marginBottom="space30"
    style={{
      marginTop: "-0.75rem",
      paddingTop: "0.375rem",
      paddingBottom: "0.2rem",
    }}
  >
    <Box title="Sentiment">
      <SentimentBadge label={results?.sentiment?.result?.label ?? null} />
    </Box>
    <Box title="Script">
      <ScriptIndicators
        categories={results?.script?.result?.categories ?? []}
      />
    </Box>
    <Box title="Score" style={{ width: "4rem" }}>
      <ScoreBar score={results?.score?.result?.score ?? null} />
    </Box>
  </Box>
);
