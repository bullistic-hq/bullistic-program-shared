import { createMintToInstruction } from "@solana/spl-token";
import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";

export default function createMintToIx(
  mint: PublicKey,
  dest: PublicKey,
  mintAuthority: PublicKey,
  multiSigners: Array<Keypair>,
  amount: number
): TransactionInstruction {
  return createMintToInstruction(
    mint,
    dest,
    mintAuthority,
    amount,
    multiSigners
  );
}
