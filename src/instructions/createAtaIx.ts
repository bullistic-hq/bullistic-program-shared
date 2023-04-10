import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import findAtaPda from "pdas/findAtaPda";

export default async function createAtaIx(
  mint: PublicKey,
  owner: PublicKey,
  wallet: PublicKey
): Promise<TransactionInstruction> {
  const [ata] = findAtaPda(owner, mint);
  return createAssociatedTokenAccountInstruction(wallet, ata, owner, mint);
}
