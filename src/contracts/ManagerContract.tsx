import {
  Address,
  AddressValue,
  Code,
  CodeMetadata,
  DeployArguments,
  SmartContract,
  TokenPayment,
  TypedValue,
  U8Value
} from '@multiversx/sdk-core/out';
import { GAS_LIMIT } from '@multiversx/sdk-dapp/constants';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { getAccount, getAddress, getChainID } from '@multiversx/sdk-dapp/utils';
import { smartContractCode } from 'helpers/constants';

export const deployContractGasLimit = 400_000_000;

export async function deployMultisigContract() {
  const address = await getAddress();
  const account = await getAccount(address);

  if (account === null) {
    throw new Error('Account not found');
  }

  const multisigAddress = SmartContract.computeAddress(
    new Address(address),
    account.nonce as any
  );
  const boardMembers = [new AddressValue(new Address(address))];
  const quorum = 1;
  const deployTransaction = getDeployContractTransaction(quorum, boardMembers);

  const transactions = [deployTransaction];
  const { sessionId } = await sendTransactions({
    transactions
  });
  return { sessionId, multisigAddress: multisigAddress.bech32() };
}

function getDeployContractTransaction(
  quorum: number,
  boardMembers: AddressValue[]
) {
  const chainID = getChainID();
  const contract = new SmartContract({});
  const code = Code.fromBuffer(Buffer.from(smartContractCode, 'hex'));
  const codeMetadata = new CodeMetadata(false, true, true);
  const quorumTyped = new U8Value(quorum);
  const initArguments: TypedValue[] = [quorumTyped, ...boardMembers];
  const value = TokenPayment.egldFromAmount(0);
  const deployArguments: DeployArguments = {
    code,
    codeMetadata,
    initArguments,
    value,
    gasLimit: GAS_LIMIT,
    chainID
  };
  return contract.deploy(deployArguments);
}
