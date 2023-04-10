import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import Environment from "constants/Environment";
import invariant from "tiny-invariant";

const LOCAL_AIRDROP_AMOUNT = 50;

// Note: devnet|testnet airdrop size is limited.
const NON_LOCAL_AIRDROP_AMOUNT = 2;

export default async function requestAirdrops({
  wallets,
  connection,
  environment = Environment.Local,
  amountInSol,
}: {
  amountInSol?: number;
  connection: Connection;
  environment?: Environment;
  wallets: Array<Keypair | PublicKey>;
}): Promise<void> {
  invariant(
    environment !== Environment.Production,
    "Airdropping is not supported on mainnet."
  );

  const amount =
    amountInSol != null
      ? amountInSol
      : environment === Environment.Local
      ? LOCAL_AIRDROP_AMOUNT
      : NON_LOCAL_AIRDROP_AMOUNT;

  if (environment !== Environment.Local && amount > NON_LOCAL_AIRDROP_AMOUNT) {
    throw new Error(
      `Airdrop requests are limited to ${NON_LOCAL_AIRDROP_AMOUNT} on non-local networks.`
    );
  }

  await Promise.all(
    wallets.map(async (wallet) => {
      const amountInLamports = amount * LAMPORTS_PER_SOL;
      const signature = await connection.requestAirdrop(
        "publicKey" in wallet ? wallet.publicKey : wallet,
        amountInLamports
      );
      // FIXME: For some reason the following (correct) code failed when used
      // with a 'signature must be base58 encoded' error. Somehow it was importing
      // a wrongly versioned @solana/web3.js library (not sure how).
      // const latestBlockhash = await connection.getLatestBlockhash();
      // const opts = { ...latestBlockhash, signature };
      // await connection.confirmTransaction(opts);

      // For now, using the deprecated approach gets this to work.
      await connection.confirmTransaction(signature, "confirmed");
    })
  );
}
