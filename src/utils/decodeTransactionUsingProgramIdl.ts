import { BorshInstructionCoder, Idl, Instruction } from "@project-serum/anchor";
import { IdlInstruction } from "@project-serum/anchor/dist/cjs/idl";
import {
  ParsedMessageAccount,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import {
  DecodedInstructionAccount,
  GenericDecodedTransaction,
  Maybe,
} from "types";
import AnchorInstructionArgs from "types/AnchorInstructionArgs";
import arePublicKeysEqual from "utils/arePublicKeysEqual";

function getInstructionFromIdl(idl: Idl, name: string): Maybe<IdlInstruction> {
  return idl.instructions.find((ix) => ix.name === name) ?? null;
}

function decodeInstructionAccounts(
  idlInstruction: IdlInstruction,
  transactionInstructionAccounts: Array<PublicKey>,
  transactionAccountKeys: Array<ParsedMessageAccount>
): Array<DecodedInstructionAccount> {
  return idlInstruction.accounts.map((account, index) => {
    const pubkey = transactionInstructionAccounts[index];
    const transactionAccount = transactionAccountKeys.find((val) =>
      arePublicKeysEqual(val.pubkey, pubkey)
    )!;
    return {
      isMut: transactionAccount.writable,
      isSigner: transactionAccount.signer,
      name: account.name,
      pubkey,
    };
  });
}

function decodeInstruction(
  ixCoder: BorshInstructionCoder,
  ix: PartiallyDecodedInstruction
): Maybe<Instruction> {
  return ixCoder.decode(ix.data ?? "", "base58");
}

type GenericDecodedTransactionResult = Record<
  string,
  GenericDecodedTransaction<string>
>;

function parseIdlInstruction(
  idlInstruction: IdlInstruction,
  decodedInstruction: Instruction,
  transactionInstruction: PartiallyDecodedInstruction,
  parsedTransaction: ParsedTransactionWithMeta
) {
  const ixAccounts = transactionInstruction.accounts;
  const labelledIxAccounts = decodeInstructionAccounts(
    idlInstruction,
    ixAccounts,
    parsedTransaction.transaction.message.accountKeys
  );
  const accountsMap = labelledIxAccounts.reduce((result, account) => {
    return {
      ...result,
      [account.name]: account,
    };
  }, {});
  const data = decodedInstruction.data as AnchorInstructionArgs;
  const decodedTransaction: GenericDecodedTransaction<string> = {
    ...decodedInstruction,
    data,
    logs: parsedTransaction?.meta?.logMessages ?? [],
  };
  return {
    decodedTransaction: { accountsMap, ...decodedTransaction },
    name: decodedInstruction.name,
  };
}

/**
 * Decodes a transaction using an Anchor generated program IDL.
 *
 * This function expects a concrete return type to be passed in, which can be
 * derived from the specific program's IDL, like this:
 * https://github.com/bullistic-hq/bullistic-auction-house/blob/2c9ac2e2a1905440385612daa30da6688165a390/src/utils/tx-parsing/DecodedAuctionHouseTransactionResult.ts#L4
 */
export default function decodeTransactionUsingProgramIdl<
  DecodedTransactionResult extends GenericDecodedTransactionResult
>(
  idl: Idl,
  programId: PublicKey,
  parsedTransaction: ParsedTransactionWithMeta
): Maybe<DecodedTransactionResult> {
  try {
    const ixCoder = new BorshInstructionCoder(idl);
    const instructions =
      parsedTransaction.transaction?.message?.instructions ?? [];

    const result: GenericDecodedTransactionResult = instructions
      .map((instruction) => {
        // The following may throw if the IDL which is being used does not actually
        // match the program IDL, which may happen for some legacy transactions where
        // we didn't actually record the changed IDLs correctly.
        try {
          if (!arePublicKeysEqual(instruction.programId, programId)) {
            return null;
          }

          const decodedInstruction = decodeInstruction(
            ixCoder,
            instruction as PartiallyDecodedInstruction
          );

          if (decodedInstruction != null) {
            const idlInstruction = getInstructionFromIdl(
              idl,
              decodedInstruction.name
            );

            if (idlInstruction != null) {
              return parseIdlInstruction(
                idlInstruction,
                decodedInstruction,
                instruction as PartiallyDecodedInstruction,
                parsedTransaction
              );
            }
          }

          return null;
        } catch (err) {
          return null;
        }
      })
      .reduce((decodedTransactionResult, decodedIx) => {
        if (decodedIx != null) {
          const { name, decodedTransaction } = decodedIx;
          return {
            ...decodedTransactionResult,
            [name]: decodedTransaction,
          };
        } else {
          return decodedTransactionResult;
        }
      }, {});

    return Object.keys(result).length > 0
      ? (result as DecodedTransactionResult)
      : null;
  } catch (err) {
    return null;
  }
}
