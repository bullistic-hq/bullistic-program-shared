import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { findAtaPda } from "pdas";
import createAta from "transactions/createAta";
import logIfDebug from "utils/logIfDebug";

export default async function createAtaIfNotExists(
  connection: Connection,
  owner: PublicKey,
  tokenMint: PublicKey,
  payer: Keypair,
  label?: string
): Promise<PublicKey> {
  const [tokenAccount] = findAtaPda(owner, tokenMint);
  const tokenAccountExists =
    (await connection.getAccountInfo(tokenAccount)) != null;
  if (!tokenAccountExists) {
    if (label != null) {
      logIfDebug(
        `Creating ${label} ATA at address: ${tokenAccount.toString()}`
      );
    }
    await createAta(connection, tokenMint, owner, payer);
  }

  return tokenAccount;
}
