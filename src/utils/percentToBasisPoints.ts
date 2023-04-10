import { BN } from "bn.js";
import { GenericNumber } from "types";

export default function percentToBasisPoints(percent: GenericNumber) {
  return new BN(percent).mul(new BN(100));
}
