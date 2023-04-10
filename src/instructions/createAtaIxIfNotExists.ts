import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import createAtaIx from "instructions/createAtaIx";
import findAtaPda from "pdas/findAtaPda";
import { Maybe } from "types";

export default async function createAtaIxIfNotExists(
  connection: Connection,
  owner: PublicKey,
  tokenMint: PublicKey,
  payer: PublicKey
): Promise<Maybe<TransactionInstruction>> {
  const [ata] = findAtaPda(owner, tokenMint);
  const ataAccount = await connection.getAccountInfo(ata);

  if (ataAccount != null) {
    return null;
  }

  return createAtaIx(tokenMint, owner, payer);
}
