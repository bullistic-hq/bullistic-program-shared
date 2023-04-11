import AnchorInstructionArgs from "types/AnchorInstructionArgs";

type GenericDecodedTransaction<IdlInstructionName> = {
  // Note: It's hard to infer the deserialized data object correctly.
  // See details: https://github.com/bullistic-hq/bullistic-auction-house/pull/259#discussion_r1086727756
  data: AnchorInstructionArgs;
  logs: Array<string>;
  name: IdlInstructionName;
};

export default GenericDecodedTransaction;
