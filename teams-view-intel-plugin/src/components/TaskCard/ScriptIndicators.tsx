import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";
import { ScriptCategory } from "../../types/operatorResults";
import { BackgroundColorToken } from "./types";

type DotProps = {
  color: BackgroundColorToken;
  title?: string;
};

const Dot = ({ color, title }: DotProps) => (
  <Box
    title={title}
    backgroundColor={color}
    borderRadius="borderRadiusPill"
    style={{ width: "6px", height: "6px" }}
    flexShrink={0}
  />
);

const PLACEHOLDER_DOT_COUNT = [0, 1, 2, 3, 4];

type Props = {
  categories: ScriptCategory[];
};

export const ScriptIndicators = ({ categories }: Props) => (
  <Stack orientation="horizontal" spacing="space10">
    {categories.length
      ? categories.slice(0, 5).map((cat) => (
          <Dot
            key={cat.category_key}
            title={cat.category_key}
            color={cat.criteria.every((c) => c.criteria_met === "Succeeded") ? "colorBackgroundSuccess" : "colorBackgroundError"}
          />
        ))
      : PLACEHOLDER_DOT_COUNT.map((i) => <Dot key={i} color="colorBackgroundStrong" />)}
  </Stack>
);
