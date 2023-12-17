import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  31337: {},
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
