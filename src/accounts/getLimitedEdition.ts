import { Edition } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import findEditionPda from "pdas/findEditionPda";

export default async function getLimitedEdition(
  connection: Connection,
  mint: PublicKey
): Promise<Edition> {
  const [editionPda] = findEditionPda(mint);
  const edition = await Edition.fromAccountAddress(connection, editionPda);
  return edition;
}
