import { createTransferInstruction } from "@solana/spl-token";
import { PublicKey, Signer } from "@solana/web3.js";

export default async function createTransferAtaIx(
  destinationTokenAccount: PublicKey,
  sourceTokenAccount: PublicKey,
  wallet: PublicKey,
  signers: Array<Signer>,
  amount: number
) {
  return createTransferInstruction(
    sourceTokenAccount,
    destinationTokenAccount,
    wallet,
    amount,
    signers
  );
}
