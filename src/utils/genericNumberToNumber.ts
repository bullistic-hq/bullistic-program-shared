import { BN } from "bn.js";
import GenericNumber from "types/GenericNumber";

export default function genericNumberToNumber(gn: GenericNumber): number {
  if (BN.isBN(gn)) {
    return gn.toNumber();
  }

  if (typeof gn === "string") {
    return Number(gn);
  }

  return gn;
}
