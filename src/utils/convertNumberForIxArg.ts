import BN from "bn.js";
import { Maybe, MaybeUndef } from "types";

export default function convertNumberForIxArg(
  n: MaybeUndef<number>
): Maybe<BN> {
  return n == null ? null : new BN(n);
}
