import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function solToLamports(sol: number): number {
  return sol * LAMPORTS_PER_SOL;
}
