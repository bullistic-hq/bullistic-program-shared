import BN from "bn.js";
import { GenericNumber } from "types";

export default function basisPointsToPercent(bp: GenericNumber): BN {
  return new BN(bp).div(new BN(100));
}
