import { createTransferInstruction } from "@solana/spl-token";
import { PublicKey, Signer, TransactionInstruction } from "@solana/web3.js";
import findAtaPda from "pdas/findAtaPda";

export default async function createTransferIx(
  mint: PublicKey,
  destination: PublicKey,
  source: PublicKey,
  owner: PublicKey,
  multiSigners: Array<Signer>,
  amount: number
): Promise<TransactionInstruction> {
  const [[sourceAta], [destinationAta]] = await Promise.all([
    findAtaPda(source, mint),
    findAtaPda(destination, mint),
  ]);
  return createTransferInstruction(
    sourceAta,
    destinationAta,
    owner,
    amount,
    multiSigners
  );
}
