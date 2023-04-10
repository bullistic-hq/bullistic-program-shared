import { Data } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getTokenBalance } from "accounts";
import createNftMint from "instructions/createNftMint";
import { findAtaPda, findEditionPda, findTokenMetadataPda } from "pdas";
import createAta from "transactions/createAta";
import createMasterEdition from "transactions/createMasterEdition";
import createMetadata from "transactions/createMetadata";
import mintTo from "transactions/mintTo";

function getTestMetadata(): Data {
  return {
    creators: null,
    name: "test",
    sellerFeeBasisPoints: 0,
    symbol: "test",
    uri: "test",
  };
}

export default async function mintMasterEditionForTest(
  wallet: Keypair,
  connection: Connection
): Promise<PublicKey> {
  const tokenMint = await createNftMint(connection, wallet);

  const [ata] = findAtaPda(wallet.publicKey, tokenMint);
  const tokenAccountExists = await connection.getAccountInfo(ata);
  if (!tokenAccountExists) {
    await createAta(connection, tokenMint, wallet.publicKey, wallet);
  }

  const [metadata] = findTokenMetadataPda(tokenMint);
  const metadataExists = await connection.getAccountInfo(metadata);
  if (!metadataExists) {
    await createMetadata(
      connection,
      wallet,
      tokenMint,
      wallet.publicKey,
      wallet.publicKey,
      getTestMetadata()
    );
  }

  const tokenBalance = await getTokenBalance(connection, ata);
  if (tokenBalance < 1) {
    await mintTo(connection, tokenMint, ata, wallet.publicKey, [wallet], 1);
  }

  const [editionPda] = findEditionPda(tokenMint);
  const masterEditionExists = await connection.getAccountInfo(editionPda);
  if (!masterEditionExists) {
    await createMasterEdition(
      connection,
      wallet,
      editionPda,
      tokenMint,
      wallet.publicKey,
      wallet.publicKey,
      metadata
    );
  }

  return tokenMint;
}
