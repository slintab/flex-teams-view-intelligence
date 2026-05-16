import { withTaskContext, ITask } from "@twilio/flex-ui";
import { Box } from "@twilio-paste/core/box";
import { Separator } from "@twilio-paste/core/separator";
import { useOperatorResults } from "../../hooks/useOperatorResults";
import { getChannelSid } from "../../utils/task";
import { ScoreSection } from "./ScoreSection";
import { SentimentSection } from "./SentimentSection";
import { ScriptSection } from "./ScriptSection";
import { SummarySection } from "./SummarySection";

type Props = {
  task?: ITask;
};

const OperatorsTabImpl = ({ task }: Props) => {
  const results = useOperatorResults(getChannelSid(task));

  return (
    <Box
      paddingTop="space50"
      paddingLeft="space50"
      paddingRight="space50"
      paddingBottom="space100"
      display="flex"
      flexDirection="column"
      rowGap="space50"
    >
      <ScoreSection score={results?.score} />
      <Separator orientation="horizontal" verticalSpacing="space0" />
      <SentimentSection sentiment={results?.sentiment} />
      <Separator orientation="horizontal" verticalSpacing="space0" />
      <ScriptSection script={results?.script} />
      <Separator orientation="horizontal" verticalSpacing="space0" />
      <SummarySection summary={results?.summary} />
    </Box>
  );
};

export const OperatorsTab = withTaskContext(OperatorsTabImpl);
