import * as Flex from "@twilio/flex-ui";
import { OperatorsTab } from "./OperatorsTab";

export const addOperatorsTab = (flex: typeof Flex) => {
  flex.Supervisor.TaskCanvasTabs.Content.add(
    <Flex.Tab key="operators" label="Operators" uniqueName="operators">
      <OperatorsTab />
    </Flex.Tab>,
    { sortOrder: 99 }
  );
};
