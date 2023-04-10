import { Keypair } from "@solana/web3.js";

// Private key for the local/dev/test bot signer keypair. A different keypair
// is used on mainnet.
export const ANTI_BOT_DEV_AUTHORITY_KEYPAIR = Keypair.fromSecretKey(
  // REPLACEME
  Uint8Array.from([0])
);
