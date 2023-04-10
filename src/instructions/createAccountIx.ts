import { MintLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";

export default function createAccountIx(
  wallet: PublicKey,
  mint: PublicKey,
  minRentLamports: number
): TransactionInstruction {
  return SystemProgram.createAccount({
    fromPubkey: wallet,
    lamports: minRentLamports,
    newAccountPubkey: mint,
    programId: TOKEN_PROGRAM_ID,
    space: MintLayout.span,
  });
}
