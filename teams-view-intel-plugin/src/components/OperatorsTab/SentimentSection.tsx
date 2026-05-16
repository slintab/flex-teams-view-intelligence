import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Heading } from "@twilio-paste/core/heading";
import { Sentiment } from "../../types/operatorResults";
import { ScoreColorToken } from "../../utils/score";

type SentimentLabel = Sentiment["result"]["label"];

const SEGMENT_COLORS: Record<SentimentLabel, ScoreColorToken> = {
  negative: "colorTextError",
  neutral:  "colorTextIconWarning",
  positive: "colorTextIconSuccess",
};

type Props = {
  sentiment: Sentiment | undefined;
};

export const SentimentSection = ({ sentiment }: Props) => {
  const active = sentiment?.result?.label ?? null;
  return (
    <Box display="flex" flexDirection="column" rowGap="space40">
      <Heading as="h3" variant="heading50">Sentiment</Heading>
      <Box display="flex" borderRadius="borderRadius20" overflow="hidden" style={{ height: "8px" }}>
        {(Object.keys(SEGMENT_COLORS) as SentimentLabel[]).map((label) => (
          <Box
            key={label}
            flexGrow={1}
            color={SEGMENT_COLORS[label]}
            backgroundColor={active === label ? undefined : "colorBackgroundStrong"}
            style={active === label ? { backgroundColor: "currentColor" } : undefined}
          />
        ))}
      </Box>
      <Box display="flex">
        {(Object.keys(SEGMENT_COLORS) as SentimentLabel[]).map((label) => (
          <Box key={label} flexGrow={1} display="flex" justifyContent="center">
            <Text
              as="span"
              fontSize="fontSize20"
              fontWeight={active === label ? "fontWeightSemibold" : "fontWeightNormal"}
              color={active === label ? SEGMENT_COLORS[label] : "colorTextWeaker"}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
