import { ITask } from "@twilio/flex-ui";

export const getChannelSid = (task: ITask | undefined): string | undefined =>
  task?.attributes.conversationSid ??
  task?.attributes.conference?.participants?.customer;
