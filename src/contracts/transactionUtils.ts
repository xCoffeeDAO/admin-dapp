import {
  Address,
  ContractFunction,
  IAddress,
  SmartContract,
  TokenPayment,
  Transaction,
  TransactionOptions,
  TransactionPayload,
  TransactionVersion,
  TypedValue
} from '@multiversx/sdk-core/out';
import { getChainID } from '@multiversx/sdk-dapp/utils';
import { gasLimit, minGasLimit } from 'config';
import { providerTypes } from 'helpers/constants';
import { multisigContractFunctionNames } from '../types/multisigFunctionNames';

interface TransactionPayloadType {
  sender: IAddress;
  chainID: string;
  receiver: IAddress;
  value: TokenPayment;
  gasLimit: number;
  data: TransactionPayload;
  options?: TransactionOptions;
  version?: TransactionVersion;
}

export function buildTransaction(
  sender: IAddress,
  value: number,
  functionName: multisigContractFunctionNames,
  providerType: string,
  contract: SmartContract,
  transactionGasLimit: number,
  ...args: TypedValue[]
): Transaction {
  const func = new ContractFunction(functionName);
  const payload = TransactionPayload.contractCall()
    .setFunction(func)
    .setArgs(args)
    .build();
  const transactionPayload: TransactionPayloadType = {
    sender: sender,
    chainID: getChainID(),
    receiver: contract.getAddress(),
    value: TokenPayment.egldFromAmount(value),
    gasLimit: minGasLimit,
    data: payload
  };
  if (providerType === providerTypes.ledger) {
    transactionPayload.options = TransactionOptions.withTxHashSignOptions();
    transactionPayload.version = TransactionVersion.withTxHashSignVersion();
  }
  return new Transaction(transactionPayload);
}

export function buildBlockchainTransaction(
  value: number,
  providerType: string,
  transactionGasLimit: number = gasLimit,
  receiver: Address,
  data: string,
  sender: IAddress
) {
  const transactionPayload: TransactionPayloadType = {
    sender: sender,
    chainID: getChainID(),
    receiver,
    value: TokenPayment.egldFromAmount(value),
    gasLimit: minGasLimit,
    data: new TransactionPayload(data)
  };

  if (providerType === providerTypes.ledger) {
    transactionPayload.options = TransactionOptions.withTxHashSignOptions();
    transactionPayload.version = TransactionVersion.withTxHashSignVersion();
  }
  return new Transaction(transactionPayload);
}
