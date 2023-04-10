export default function getEmptyRoot() {
  return Buffer.from("0".repeat(32).split("").map(Number));
}
