import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { TOKEN_METADATA_PROGRAM_ID } from "constants/ProgramIds";
import PdaResult from "types/PdaResult";

export default function findEditionMarkerPda(
  mint: PublicKey,
  edition: BN
): PdaResult {
  // editions are divided into pages of 31-bytes (248-bits) for more efficient
  // packing to check if an edition is occupied. The offset is determined from
  // the edition passed in through data
  const editionPageNumber = edition.div(new BN(248)).toNumber();

  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
      Buffer.from(String(editionPageNumber)),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
}
