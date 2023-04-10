import { Connection } from "@solana/web3.js";
import MAX_SUPPORTED_TRANSACTION_VERSION from "constants/MaxSupportedTransactionVersion";
import { Maybe } from "types";

const SIGNATURE_SIZE = 64;

// See https://docs.solana.com/developing/programming-model/transactions#compact-u16-format
function getSignatureLengthBytes(signatureLength: number) {
  if (signatureLength <= 2 ** 7 - 1) {
    return 1;
  }
  if (signatureLength <= 2 ** 14 - 1) {
    return 2;
  }
  return 3;
}

// Lifted from https://github.com/formfunction-hq/formfn-monorepo/blob/main/packages/server/src/utils/solana/txs/getTransactionSizeInBytes.ts
export default async function estimateTransactionSizeInBytes(
  txid: string,
  connection: Connection
): Promise<Maybe<number>> {
  const response = await connection.getTransaction(txid, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: MAX_SUPPORTED_TRANSACTION_VERSION,
  });
  if (response == null) {
    return null;
  }
  const { message } = response.transaction;
  return (
    // Implementation based on Solana Explorer's https://github.com/solana-labs/solana/blob/master/explorer/src/pages/inspector/InspectorPage.tsx#L316
    // They show tx size on their Inspect page, e.g. https://explorer.solana.com/tx/42BHJY3YNyqe6YM7R2md53MV19KUMVLzFk9sqW1QUQ3VxE8dFQQmZEsECV5LFwuk5J6rJ3W32XqyZGTAJPQaTeUo/inspect
    message.serialize().length +
    message.header.numRequiredSignatures * SIGNATURE_SIZE +
    getSignatureLengthBytes(message.header.numRequiredSignatures)
  );
}
