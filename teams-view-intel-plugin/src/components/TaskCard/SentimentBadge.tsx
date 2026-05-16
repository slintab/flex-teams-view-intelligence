import { MinusIcon } from "@twilio-paste/icons/esm/MinusIcon";
import { PlusIcon } from "@twilio-paste/icons/esm/PlusIcon";
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";
import { Sentiment } from "../../types/operatorResults";
import { ScoreColorToken } from "../../utils/score";

type SentimentLabel = Sentiment["result"]["label"];

const SENTIMENT_MAP: Record<
  SentimentLabel,
  { Icon: React.ElementType; color: ScoreColorToken }
> = {
  negative: { Icon: CloseIcon, color: "colorTextError" },
  neutral: { Icon: MinusIcon, color: "colorTextIconWarning" },
  positive: { Icon: PlusIcon, color: "colorTextIconSuccess" },
};

type Props = {
  label: SentimentLabel | null;
};

export const SentimentBadge = ({ label }: Props) => {
  if (!label) {
    return (
      <MinusIcon
        decorative={false}
        title="unknown"
        size="sizeIcon20"
        color="colorTextWeaker"
      />
    );
  }
  const { Icon, color } = SENTIMENT_MAP[label];
  return (
    <Icon decorative={false} title={label} size="sizeIcon20" color={color} />
  );
};
