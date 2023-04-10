import {
  createCreateMetadataAccountInstruction,
  Data,
} from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey, Transaction } from "@solana/web3.js";
import ixToTx from "instructions/ixToTx";
import { findTokenMetadataPda } from "pdas";

export default async function createMetadataTx(
  feePayer: PublicKey,
  mint: PublicKey,
  mintAuthority: PublicKey,
  updateAuthority: PublicKey,
  metadataData: Data
): Promise<Transaction> {
  const [metadata] = findTokenMetadataPda(mint);
  const ix = createCreateMetadataAccountInstruction(
    {
      metadata,
      mint,
      mintAuthority,
      payer: feePayer,
      updateAuthority,
    },
    {
      createMetadataAccountArgs: {
        data: metadataData,
        isMutable: true,
      },
    }
  );
  return ixToTx(ix);
}
