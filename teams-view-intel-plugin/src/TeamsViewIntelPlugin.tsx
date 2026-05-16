import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import { CustomizationProvider } from "@twilio-paste/core/customization";

import { addTaskCardWrapper } from "./components/TaskCard/addTaskCardWrapper";
import { addOperatorsTab } from "./components/OperatorsTab/addOperatorsTab";

const PLUGIN_NAME = "TeamsViewIntelPlugin";

export default class TeamsViewIntelPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    flex.setProviders({ PasteThemeProvider: CustomizationProvider });

    const isAdminOrSupervisor =
      manager.user.roles.includes("admin") ||
      manager.user.roles.includes("supervisor");

    if (isAdminOrSupervisor) {
      addTaskCardWrapper(flex);
      addOperatorsTab(flex);
    }
  }
}
