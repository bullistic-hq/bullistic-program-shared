import { Keypair } from "@solana/web3.js";

export default function generateKeypairArray(size: number): Array<Keypair> {
  return new Array(size).fill(null).map((_) => Keypair.generate());
}
