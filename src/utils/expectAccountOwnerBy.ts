import { Connection, PublicKey } from "@solana/web3.js";
import expectPublicKeysEqual from "utils/expectPublicKeysEqual";

export default async function expectAccountOwnedBy(
  connection: Connection,
  account: PublicKey,
  owner: PublicKey
): Promise<void> {
  const accountInfo = await connection.getAccountInfo(account);
  expectPublicKeysEqual(accountInfo!.owner, owner);
}
