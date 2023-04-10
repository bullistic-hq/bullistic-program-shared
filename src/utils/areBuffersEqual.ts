export default function areBuffersEqual(a: Buffer, b: Buffer): boolean {
  return Buffer.compare(a, b) === 0;
}
