import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Heading } from "@twilio-paste/core/heading";
import { Score } from "../../types/operatorResults";
import { scoreColor, clampScore, scorePct } from "../../utils/score";

type Props = {
  score: Score | undefined;
};

export const ScoreSection = ({ score }: Props) => {
  const value = score?.result?.score ?? null;
  const clamped = value != null ? clampScore(value) : null;
  const pct = clamped != null ? scorePct(clamped) : 0;

  return (
    <Box display="flex" flexDirection="column" rowGap="space40">
      <Heading as="h3" variant="heading50">Score</Heading>
      {clamped != null ? (
        <Box display="flex" flexDirection="column" rowGap="space30">
          <Box display="flex" alignItems="center" columnGap="space30">
            <Box
              backgroundColor="colorBackgroundStrong"
              borderRadius="borderRadiusPill"
              overflow="hidden"
              flexGrow={1}
              style={{ height: "6px" }}
            >
              <Box
                color={scoreColor(clamped)}
                height="100%"
                borderRadius="borderRadiusPill"
                style={{ width: `${pct}%`, backgroundColor: "currentColor" }}
              />
            </Box>
            <Text as="span" fontSize="fontSize30" fontWeight="fontWeightSemibold" color={scoreColor(clamped)}>
              {clamped} / 10
            </Text>
          </Box>
          {score?.result?.reason && (
            <Text as="p" fontSize="fontSize30" color="colorTextWeak">
              {score.result.reason}
            </Text>
          )}
        </Box>
      ) : (
        <Text as="p" fontSize="fontSize30" color="colorTextWeak">No data</Text>
      )}
    </Box>
  );
};
