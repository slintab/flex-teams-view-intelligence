import * as Flex from "@twilio/flex-ui";
import { Box } from "@twilio-paste/core/box";
import { useOperatorResults } from "../../hooks/useOperatorResults";
import { getChannelSid } from "../../utils/task";
import { OperatorResultsPanel } from "./OperatorResultsPanel";

export const addTaskCardWrapper = (flex: typeof Flex) => {
  flex.Supervisor.TaskCard.Content.addWrapper((Original) => (originalProps) => {
    const channelSid = getChannelSid(originalProps.task);
    const results = useOperatorResults(channelSid);
    return (
      <Box display="inline-flex" flexDirection="column">
        <Original {...originalProps} selected={false} />
        <OperatorResultsPanel results={results} />
      </Box>
    );
  });
};
