import { PublicKeyOrString } from "types";
import arePublicKeysEqual from "utils/arePublicKeysEqual";

export default function expectPublicKeysEqual(
  pubkey1: PublicKeyOrString,
  pubkey2: PublicKeyOrString
): void {
  expect(arePublicKeysEqual(pubkey1, pubkey2)).toBe(true);
}
