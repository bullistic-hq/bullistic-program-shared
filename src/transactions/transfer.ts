import { createTransferCheckedInstruction } from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { Maybe } from "types";

export default async function transfer(
  connection: Connection,
  owner: Keypair,
  fromTokenAccount: PublicKey,
  tokenMint: PublicKey,
  toTokenAccount: PublicKey,
  amountToTransfer = 1
): Promise<Maybe<TransactionSignature>> {
  const transferTx = new Transaction();
  transferTx.add(
    createTransferCheckedInstruction(
      fromTokenAccount,
      tokenMint,
      toTokenAccount,
      owner.publicKey,
      amountToTransfer,
      0,
      []
    )
  );

  return sendAndConfirmTransaction(connection, transferTx, [owner]);
}
