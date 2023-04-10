import {
  AccountLayout,
  getMinimumBalanceForRentExemptAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { createTokenAccountIx } from "instructions";

export default async function createTokenAccount(
  connection: Connection,
  mint: PublicKey,
  owner: Keypair
): Promise<PublicKey> {
  const keypair = Keypair.generate();
  const balanceNeeded = await getMinimumBalanceForRentExemptAccount(connection);
  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: owner.publicKey,
    lamports: balanceNeeded,
    newAccountPubkey: keypair.publicKey,
    programId: TOKEN_PROGRAM_ID,
    space: AccountLayout.span,
  });

  const tokenAccountIx = createTokenAccountIx(
    mint,
    owner.publicKey,
    keypair.publicKey
  );
  const transaction = new Transaction();
  transaction.add(createAccountIx);
  transaction.add(tokenAccountIx);

  // Order of signers matters—first signer is fee payer
  await sendAndConfirmTransaction(connection, transaction, [owner, keypair]);

  return keypair.publicKey;
}
