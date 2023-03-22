import {
  Address,
  AddressValue,
  Code,
  CodeMetadata,
  DeployArguments,
  SmartContract,
  TypedValue,
  U8Value
} from '@multiversx/sdk-core/out';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { getAccount, getAddress, getChainID } from '@multiversx/sdk-dapp/utils';
import { smartContractCode } from 'helpers/constants';

export const deployContractGasLimit = 400_000_000;

export async function deployMultisigContract() {
  const address = await getAddress();
  const account = await getAccount(address);
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
  const value = Balance.Zero();
  const deployArguments: DeployArguments = {
    code,
    codeMetadata,
    initArguments,
    value,
    gasLimit: new GasLimit(deployContractGasLimit),
    chainID
  };
  return contract.deploy(deployArguments);
}
