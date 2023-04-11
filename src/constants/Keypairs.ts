import { Keypair } from "@solana/web3.js";

// Private key for the local/dev/test bot signer keypair. A different keypair
// is used on mainnet.
export const ANTI_BOT_DEV_AUTHORITY_KEYPAIR = Keypair.fromSecretKey(
  Uint8Array.from([
    158, 34, 10, 105, 239, 33, 15, 177, 68, 215, 94, 187, 214, 202, 214, 14,
    199, 164, 196, 80, 67, 222, 83, 12, 154, 1, 98, 77, 155, 10, 130, 38, 82,
    116, 101, 137, 225, 39, 119, 165, 110, 47, 135, 72, 110, 46, 221, 96, 181,
    54, 55, 68, 160, 109, 174, 189, 145, 47, 38, 3, 163, 204, 92, 107,
  ])
);
