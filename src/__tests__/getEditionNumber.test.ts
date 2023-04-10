import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import getEditionNumber from "accounts/getEditionNumber";

// using a devnet mint that has a limited edition, test will fail if this mint is updated
const mint = "84R4kNkZGRjtR6EtC9GJ2MgXATGhwkWq2xUnbhTeePjt";
test("getEditionNumber", async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const result = await getEditionNumber(connection, new PublicKey(mint));
  expect(result).toEqual(0);
});
