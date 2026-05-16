import { Twilio } from "twilio";
import "@twilio-labs/serverless-runtime-types";
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

const { createResponse, createError } = require(
  Runtime.getFunctions()["common/utils"].path,
);

type OperatorResult = {
  id: string;
  operator: {
    id: string;
    displayName: string;
  };
  result: Record<string, unknown>;
  referenceIds: string[];
};

type DocumentData = Record<
  string,
  { id: string; displayName: string; result: Record<string, unknown> }
>;

type MyEvent = {
  request: { cookies: Record<string, string>; headers: Record<string, string> };
  operatorResults: OperatorResult[];
};

type MyContext = {
  SYNC_SERVICE_SID: string;
  SENTIMENT_OPERATOR_ID: string;
  SCRIPT_ADHERENCE_OPERATOR_ID: string;
  SUMMARY_OPERATOR_ID: string;
  CONVERSATION_SCORE_OPERATOR_ID: string;
};

async function saveToSyncDocument(
  context: Context<MyContext>,
  channelSid: string,
  data: DocumentData,
) {
  const client = context.getTwilioClient() as any as Twilio;
  const syncServiceSid = context.SYNC_SERVICE_SID;
  const documentName = "operator_results_" + channelSid;

  try {
    await client.sync.v1
      .services(syncServiceSid)
      .documents(documentName)
      .update({ data });
  } catch (err: any) {
    if (err.status === 404 || err.code === 20404) {
      await client.sync.v1
        .services(syncServiceSid)
        .documents.create({ uniqueName: documentName, data, ttl: 86400 });
    } else {
      throw err;
    }
  }
}

export const handler: ServerlessFunctionSignature<MyContext, MyEvent> =
  async function (
    context: Context<MyContext>,
    event: MyEvent,
    callback: ServerlessCallback,
  ) {
    const {
      SYNC_SERVICE_SID,
      SENTIMENT_OPERATOR_ID,
      SCRIPT_ADHERENCE_OPERATOR_ID,
      SUMMARY_OPERATOR_ID,
      CONVERSATION_SCORE_OPERATOR_ID,
    } = context;

    const { operatorResults } = event;

    if (
      !(
        SYNC_SERVICE_SID &&
        SENTIMENT_OPERATOR_ID &&
        SCRIPT_ADHERENCE_OPERATOR_ID &&
        SUMMARY_OPERATOR_ID &&
        CONVERSATION_SCORE_OPERATOR_ID
      )
    ) {
      return createError(Error("Internal error"), 500, callback);
    }

    if (!operatorResults) {
      return createError(Error("Missing parameters"), 400, callback);
    }

    const operatorMap: Record<string, string> = {
      [SENTIMENT_OPERATOR_ID]: "sentiment",
      [SCRIPT_ADHERENCE_OPERATOR_ID]: "script",
      [SUMMARY_OPERATOR_ID]: "summary",
      [CONVERSATION_SCORE_OPERATOR_ID]: "score",
    };

    try {
      const resultsMap = new Map<string, DocumentData>();

      for (const operatorResult of operatorResults) {
        const operator = operatorMap[operatorResult.operator.id];
        if (!operator) continue;

        const operatorPayload = {
          id: operatorResult.operator.id,
          displayName: operatorResult.operator.displayName,
          result: operatorResult.result,
        };

        for (const channelSid of operatorResult.referenceIds) {
          if (!channelSid.startsWith("CA") && !channelSid.startsWith("CH"))
            continue;

          const document = resultsMap.get(channelSid) ?? {};
          document[operator] = operatorPayload;
          resultsMap.set(channelSid, document);
        }
      }

      for (const [channelSid, data] of resultsMap) {
        await saveToSyncDocument(context, channelSid, data);
      }

      return createResponse({ result: true }, callback);
    } catch (err) {
      return createError(Error("Internal error"), 500, callback);
    }
  };
