import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { scoreColor, clampScore, scorePct } from "../../utils/score";

type Props = {
  score: number | null;
};

export const ScoreBar = ({ score }: Props) => {
  const clamped = score != null ? clampScore(score) : null;
  const pct = clamped != null ? scorePct(clamped) : 0;

  return (
    <Box display="flex" alignItems="center" columnGap="space10" title="Score">
      <Box
        backgroundColor="colorBackgroundStrong"
        borderRadius="borderRadiusPill"
        style={{ height: "2px" }}
        overflow="hidden"
        flexGrow={1}
      >
        <Box
          color={clamped != null ? scoreColor(clamped) : undefined}
          height="100%"
          style={{ width: `${pct}%`, backgroundColor: "currentColor" }}
          borderRadius="borderRadiusPill"
        />
      </Box>
      {clamped != null && (
        <Text as="span" fontSize="fontSize10" color="colorTextWeak" whiteSpace="nowrap">
          {clamped}
        </Text>
      )}
    </Box>
  );
};
