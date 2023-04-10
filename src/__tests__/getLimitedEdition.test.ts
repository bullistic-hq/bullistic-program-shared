import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import getLimitedEdition from "accounts/getLimitedEdition";

// using a devnet mint that has a limited edition, test will fail if this mint is updated
const mint = "84R4kNkZGRjtR6EtC9GJ2MgXATGhwkWq2xUnbhTeePjt";
test("getLimitedEdition", async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const result = await getLimitedEdition(connection, new PublicKey(mint));
  expect(result.key).toBe(6);
});
