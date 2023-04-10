import { Data } from "@metaplex-foundation/mpl-token-metadata";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  TransactionSignature,
} from "@solana/web3.js";
import createMetadataTx from "instructions/createMetadataTx";

export default async function createMetadata(
  connection: Connection,
  feePayer: Keypair,
  mint: PublicKey,
  mintAuthority: PublicKey,
  updateAuthority: PublicKey,
  metadataData: Data
): Promise<TransactionSignature> {
  const tx = await createMetadataTx(
    feePayer.publicKey,
    mint,
    mintAuthority,
    updateAuthority,
    metadataData
  );

  return sendAndConfirmTransaction(connection, tx, [feePayer]);
}
