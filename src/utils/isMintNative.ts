import { PublicKey } from "@solana/web3.js";
import { WRAPPED_SOL_MINT } from "constants/ProgramIds";
import arePublicKeysEqual from "utils/arePublicKeysEqual";

export default function isMintNative(mint: PublicKey) {
  return arePublicKeysEqual(mint, WRAPPED_SOL_MINT);
}
