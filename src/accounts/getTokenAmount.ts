import { Connection, PublicKey } from "@solana/web3.js";
import getTokenAccountInfo from "accounts/getTokenAccountInfo";

export default async function getTokenAmount(
  connection: Connection,

  tokenAccount: PublicKey
): Promise<number> {
  const account = await getTokenAccountInfo(connection, tokenAccount);
  return Number(account.amount);
}
