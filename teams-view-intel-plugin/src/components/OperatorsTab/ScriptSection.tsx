import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Heading } from "@twilio-paste/core/heading";
import { SuccessIcon } from "@twilio-paste/icons/esm/SuccessIcon";
import { DoNotIcon } from "@twilio-paste/icons/esm/DoNotIcon";
import { Script } from "../../types/operatorResults";

const toTitleCase = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

type Props = {
  script: Script | undefined;
};

export const ScriptSection = ({ script }: Props) => (
  <Box display="flex" flexDirection="column" rowGap="space40">
    <Heading as="h3" variant="heading50">
      Script
    </Heading>
    {script?.result?.categories?.length ? (
      <Box display="flex" flexDirection="column" rowGap="space40">
        {script.result.categories.map((cat) => (
          <Box key={cat.category_key} display="flex" flexDirection="column" rowGap="space20">
            <Text as="span" fontSize="fontSize30" fontWeight="fontWeightMedium">
              {toTitleCase(cat.category_key)}
            </Text>
            <Box paddingLeft="space40" display="flex" flexDirection="column" rowGap="space10">
              {cat.criteria.map((c) => (
                <Box key={c.criteria_key} display="flex" alignItems="center" columnGap="space20">
                  {c.criteria_met === "Succeeded"
                    ? <SuccessIcon decorative={false} title="passed" size="sizeIcon10" color="colorTextIconSuccess" />
                    : <DoNotIcon decorative={false} title="failed" size="sizeIcon10" color="colorTextError" />}
                  <Text as="span" fontSize="fontSize20" color="colorTextWeak">
                    {toTitleCase(c.criteria_key)}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    ) : (
      <Text as="p" fontSize="fontSize30" color="colorTextWeak">
        No data
      </Text>
    )}
  </Box>
);
