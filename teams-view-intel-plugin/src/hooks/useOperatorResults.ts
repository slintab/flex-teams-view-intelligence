import { useEffect, useState } from "react";
import SyncService from "../services/SyncService";
import { OperatorResults } from "../types/operatorResults";

export const useOperatorResults = (
  channelSid: string | undefined,
): OperatorResults | null => {
  const [results, setResults] = useState<OperatorResults | null>(null);

  useEffect(() => {
    if (!channelSid) return;

    let cancelled = false;
    let syncDocument: Awaited<
      ReturnType<typeof SyncService.getDocument>
    > | null = null;
    const handler = (event: { data: OperatorResults }) =>
      setResults(event.data);

    const subscribe = async () => {
      syncDocument = await SyncService.getDocument(
        `operator_results_${channelSid}`,
      );
      if (!syncDocument) return;

      if (cancelled) return;
      if (syncDocument.data) {
        setResults(syncDocument.data as OperatorResults);
      }
      syncDocument.on("updated", handler);
    };

    subscribe();

    return () => {
      cancelled = true;
      if (syncDocument) {
        (syncDocument as Exclude<typeof syncDocument, false>).removeListener(
          "updated",
          handler,
        );
      }
    };
  }, [channelSid]);

  return results;
};
