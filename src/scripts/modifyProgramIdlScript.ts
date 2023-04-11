import { Idl } from "@project-serum/anchor/dist/cjs/idl";
import { exec } from "child_process";
import { writeFileSync } from "fs";
import { resolve } from "path";
import invariant from "tiny-invariant";
import uppercaseFirstLetter from "utils/uppercaseFirstLetter";

function readSourceIdlFile(filepath: string): Idl {
  // eslint-disable-next-line
  const idl = require(resolve(filepath));
  invariant(idl.IDL != null, `IDL must be exported from file at ${filepath}`);
  return idl.IDL;
}

type IxLike = { name: string };
function sortIxAlphabetically(a: IxLike, b: IxLike): number {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
}

function handleModifyProgramIdl(
  idl: Idl,
  programName: string,
  outputFile: string
): void {
  const instructionsMap = idl.instructions.sort(sortIxAlphabetically).reduce(
    (result, ix) => ({
      ...result,
      [ix.name]: ix.accounts.map((account) => account.name),
    }),
    {}
  );

  const modifiedIdl = {
    ...idl,
    instructionsMap,
  };

  const idlString = `
  export type ${programName} = ${JSON.stringify(modifiedIdl)}
  export const IDL: ${programName} = ${JSON.stringify(modifiedIdl)}`;

  writeFileSync(outputFile, idlString, "utf-8");
  console.log(`Saved modified IDL to ${outputFile}.`);
}

function getStartOfDecodedTransactionResultTypeFile(
  programName: string,
  idlFilePath: string,
  decodedTransactionResultTypeFilePath: string
): string {
  // e.g. converts "AuctionHouse" to "AUCTION_HOUSE".
  const idlConstantName = programName
    .split(/(?=[A-Z])/)
    .map((val) => val.toUpperCase())
    .join("_");

  // Need to adjust the paths a bit for the imports... This is a bit funky.
  const idlImport = idlFilePath.replace("src/", "").replace(".ts", "");

  const programInstructionNameImport = decodedTransactionResultTypeFilePath
    .replace("src/", "")
    .replace(".ts", "")
    .replace(
      `Decoded${programName}TransactionResult`,
      `${programName}InstructionName`
    );

  return `
  /**
   * NOTE: This is an auto-generated file. Don't edit it directly.
   */
  import { DecodedInstructionAccount, GenericDecodedTransaction } from "@bullistic-hq/bullistic-program-shared";
  import { IDL as ${idlConstantName}_IDL } from "${idlImport}";
  import ${programName}InstructionName from "${programInstructionNameImport}";

  const identity = <T>(val: T): T => val;

  const ixMap = ${idlConstantName}_IDL.instructionsMap ?? {};
  `;
}

function generateTypeInformation(ixName: string): string {
  return `const ${uppercaseFirstLetter(
    ixName
  )}Accounts = (ixMap.${ixName} ?? []).map(identity);
  `;
}

function generateDefaultExportType(idl: Idl, programName: string): string {
  const sortedIxNames = idl.instructions.map((ix) => ix.name).sort();
  const types = sortedIxNames.map((ixName) => {
    return `${ixName}?: GenericDecodedTransaction<${programName}InstructionName> & {
        accountsMap: {
          [Key in typeof ${uppercaseFirstLetter(
            ixName
          )}Accounts[0]]: DecodedInstructionAccount;
        };
      };`;
  });
  return `type Decoded${programName}TransactionResult = {
      ${types.join("")}
    }

    export default Decoded${programName}TransactionResult;
  `;
}

function generateDecodedTransactionResultType(
  idl: Idl,
  programName: string,
  idlFilePath: string,
  decodedTransactionResultTypeFilePath: string
): void {
  const sortedIxNames = idl.instructions.map((ix) => ix.name).sort();
  const types = sortedIxNames.map((ixName) => generateTypeInformation(ixName));
  const txResultTypeString = generateDefaultExportType(idl, programName);
  const fileString = `
    ${getStartOfDecodedTransactionResultTypeFile(
      programName,
      idlFilePath,
      decodedTransactionResultTypeFilePath
    )}
    ${types.join("\n")}
    ${txResultTypeString}
  `;
  writeFileSync(decodedTransactionResultTypeFilePath, fileString, "utf-8");
  console.log(
    `Saved decoded transaction result type to ${decodedTransactionResultTypeFilePath}.`
  );
}

function format(file: string): void {
  exec(`npx prettier --write ${file}`);
}

function lint(file: string): void {
  exec(`npx eslint --cache --fix ${file} >/dev/null`);
}

// Need to run tools to format the output code.
function formatGeneratedCode(
  idlOutputFile: string,
  decodedTransactionResultTypeFilePath: string
): void {
  console.log("Formatting generated code...");

  format(idlOutputFile);
  lint(idlOutputFile);

  format(decodedTransactionResultTypeFilePath);
  lint(decodedTransactionResultTypeFilePath);
}

/**
 * This helper script reads a program ID, modifies it, and generates a new
 * file of types which map the program instruction names to typed account maps.
 *
 * This generated code can then be used to parse program transactions with
 * more type safety.
 */
export default function modifyProgramIdlScript({
  decodedTransactionResultTypeFilePath,
  idlFilePath,
  programName,
}: {
  decodedTransactionResultTypeFilePath: string;
  idlFilePath: string;
  programName: string;
}): void {
  const idl = readSourceIdlFile(idlFilePath);
  handleModifyProgramIdl(idl, programName, idlFilePath);
  generateDecodedTransactionResultType(
    idl,
    programName,
    idlFilePath,
    decodedTransactionResultTypeFilePath
  );
  formatGeneratedCode(idlFilePath, decodedTransactionResultTypeFilePath);
}
