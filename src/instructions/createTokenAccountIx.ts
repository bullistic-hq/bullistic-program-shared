import { createInitializeAccountInstruction } from "@solana/spl-token";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";

export default function createTokenAccountIx(
  mint: PublicKey,
  owner: PublicKey,
  account: PublicKey
): TransactionInstruction {
  return createInitializeAccountInstruction(account, mint, owner);
}
