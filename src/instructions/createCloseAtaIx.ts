import { createCloseAccountInstruction } from "@solana/spl-token";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { findAtaPda } from "pdas";

export default async function createCloseAtaIx(
  mint: PublicKey,
  owner: PublicKey
): Promise<TransactionInstruction> {
  const [ata] = findAtaPda(owner, mint);
  return createCloseAccountInstruction(ata, owner, owner, []);
}
