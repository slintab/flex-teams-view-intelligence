import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Heading } from "@twilio-paste/core/heading";
import { Summary } from "../../types/operatorResults";

type Props = {
  summary: Summary | undefined;
};

export const SummarySection = ({ summary }: Props) => (
  <Box display="flex" flexDirection="column" rowGap="space40" paddingBottom="space100">
    <Heading as="h3" variant="heading50">Summary</Heading>
    {summary?.result?.text ? (
      <Text as="p" fontSize="fontSize30" color="colorTextWeak">{summary.result.text}</Text>
    ) : (
      <Text as="p" fontSize="fontSize30" color="colorTextWeak">No data</Text>
    )}
  </Box>
);
