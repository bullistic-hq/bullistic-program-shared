import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import createAtaIx from "instructions/createAtaIx";
import { Maybe } from "types/UtilityTypes";

export default async function createAta(
  connection: Connection,
  mint: PublicKey,
  owner: PublicKey,
  payer: Keypair
): Promise<Maybe<TransactionSignature>> {
  const instruction = await createAtaIx(mint, owner, payer.publicKey);
  const transaction = new Transaction();
  transaction.add(instruction);

  return sendAndConfirmTransaction(connection, transaction, [payer]);
}
