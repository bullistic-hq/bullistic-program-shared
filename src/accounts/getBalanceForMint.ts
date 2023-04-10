import { Connection, PublicKey } from "@solana/web3.js";
import { WRAPPED_SOL_MINT } from "constants/ProgramIds";
import { findAtaPda } from "pdas";
import invariant from "tiny-invariant";
import { isMintNative } from "utils";

/**
 * Gets the balance for a wallet and a given mint. Mint is optional and will
 * default to the native SOL mint.
 *
 * For token accounts, you can provide token account itself or else it will be
 * derived from the wallet. You must provide only one or the other.
 */
export default async function getBalanceForMint({
  tokenAccount,
  connection,
  mint = WRAPPED_SOL_MINT,
  wallet,
}: {
  connection: Connection;
  mint: PublicKey;
  tokenAccount?: PublicKey;
  wallet?: PublicKey;
}): Promise<number> {
  invariant(
    (tokenAccount != null && wallet == null) ||
      (wallet != null && tokenAccount == null),
    "Only one of account or wallet must be non-null."
  );

  if (isMintNative(mint)) {
    const balance = await connection.getBalance(wallet!);
    return balance;
  } else {
    try {
      const ata = tokenAccount ?? findAtaPda(wallet!, mint)[0];
      const tokenAccountBalance = await connection.getTokenAccountBalance(ata);
      return Number(tokenAccountBalance.value.amount);
    } catch (err) {
      // In cases where the account is not initialized yet, return 0.
      return 0;
    }
  }
}
