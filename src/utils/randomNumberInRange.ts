export default function randomNumberInRange(max: number, min = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
