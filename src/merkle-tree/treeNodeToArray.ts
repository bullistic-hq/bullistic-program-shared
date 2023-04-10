import { MerkleLeaf, MerkleRoot } from "types";

export default function treeNodeToArray(
  node: MerkleLeaf | MerkleRoot
): Array<number> {
  return [...node];
}
