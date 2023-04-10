import { PublicKey } from "@solana/web3.js";
import { Maybe, MaybeUndef } from "types/UtilityTypes";

export default function stringToPublicKey(
  key: MaybeUndef<string>
): Maybe<PublicKey> {
  if (key == null) {
    return null;
  }

  try {
    return new PublicKey(key);
  } catch {
    return null;
  }
}
