import { MintLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
} from "@solana/web3.js";
import { createMintIx, ixsToTx } from "instructions";

const SPL_TOKEN_DECIMALS = 0;

export default async function createSplToken(
  connection: Connection,
  wallet: Keypair
): Promise<PublicKey> {
  const splTokenMintKeypair = Keypair.generate();
  const minRentLamports = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span
  );
  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: wallet.publicKey,
    lamports: minRentLamports,
    newAccountPubkey: splTokenMintKeypair.publicKey,
    programId: TOKEN_PROGRAM_ID,
    space: MintLayout.span,
  });
  const initializeMintIx = createMintIx({
    decimals: SPL_TOKEN_DECIMALS,
    mint: splTokenMintKeypair.publicKey,
    wallet: wallet.publicKey,
  });
  await sendAndConfirmTransaction(
    connection,
    ixsToTx([createAccountIx, initializeMintIx]),
    [wallet, splTokenMintKeypair]
  );

  return splTokenMintKeypair.publicKey;
}
