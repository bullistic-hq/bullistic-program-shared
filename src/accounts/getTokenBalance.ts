import { Connection, PublicKey } from "@solana/web3.js";

export default async function getTokenBalance(
  connection: Connection,
  tokenAccount: PublicKey
): Promise<number> {
  try {
    const tokenAccountBalance = await connection.getTokenAccountBalance(
      tokenAccount
    );
    return Number(tokenAccountBalance.value.amount);
  } catch (err) {
    // May throw if token account hasn't been created yet.
    return 0;
  }
}
