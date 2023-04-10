import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import createMintToIx from "instructions/createMintToIx";
import { Maybe } from "types/UtilityTypes";

export default async function mintTo(
  connection: Connection,
  mint: PublicKey,
  dest: PublicKey,
  mintAuthority: PublicKey,
  multiSigners: Array<Keypair>,
  amount: number
): Promise<Maybe<TransactionSignature>> {
  const instruction = createMintToIx(
    mint,
    dest,
    mintAuthority,
    multiSigners,
    amount
  );
  const transaction = new Transaction();
  transaction.add(instruction);

  return sendAndConfirmTransaction(connection, transaction, multiSigners);
}
