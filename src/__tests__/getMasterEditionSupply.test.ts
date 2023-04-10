import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import getMasterEditionSupply from "accounts/getMasterEditionSupply";

// using a devnet mint that has a limited edition, test will fail if this mint is updated
const mint = "84R4kNkZGRjtR6EtC9GJ2MgXATGhwkWq2xUnbhTeePjt";
test("getMasterEditionSupply", async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const result = await getMasterEditionSupply(connection, new PublicKey(mint));
  expect(result).toEqual(0);
});
