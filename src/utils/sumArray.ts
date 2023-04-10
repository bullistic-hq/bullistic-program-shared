export default function sumArray(arr: Array<number>): number {
  return arr.reduce((sum, curr) => sum + curr, 0);
}
