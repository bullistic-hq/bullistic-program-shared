import { createCreateMasterEditionInstruction } from "@metaplex-foundation/mpl-token-metadata";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  TransactionSignature,
} from "@solana/web3.js";
import BN from "bn.js";
import ixToTx from "instructions/ixToTx";

export default async function createMasterEdition(
  connection: Connection,
  feePayer: Keypair,
  editionPda: PublicKey,
  mint: PublicKey,
  mintAuthority: PublicKey,
  updateAuthority: PublicKey,
  metadataPda: PublicKey,
  maxSupply?: number
): Promise<TransactionSignature> {
  const masterEditionIx = createCreateMasterEditionInstruction(
    {
      edition: editionPda,
      metadata: metadataPda,
      mint,
      mintAuthority,
      payer: feePayer.publicKey,
      updateAuthority,
    },
    {
      createMasterEditionArgs: {
        maxSupply: maxSupply == null ? null : new BN(maxSupply),
      },
    }
  );

  return sendAndConfirmTransaction(connection, ixToTx(masterEditionIx), [
    feePayer,
  ]);
}
