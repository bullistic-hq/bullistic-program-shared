import { createInitializeMintInstruction } from "@solana/spl-token";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";

export default function createMintIx({
  mint,
  wallet,
  decimals,
  mintAuthority,
  freezeAuthority,
}: {
  decimals?: number;
  freezeAuthority?: PublicKey;
  mint: PublicKey;
  mintAuthority?: PublicKey;
  wallet: PublicKey;
}): TransactionInstruction {
  return createInitializeMintInstruction(
    mint,
    decimals ?? 0,
    mintAuthority ?? wallet,
    freezeAuthority ?? wallet
  );
}
