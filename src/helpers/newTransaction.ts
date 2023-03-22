import {
  Address,
  Transaction,
  TransactionOptions,
  TransactionPayload,
  TransactionVersion
} from '@multiversx/sdk-core/out';
import { GAS_LIMIT, GAS_PRICE } from '@multiversx/sdk-dapp/constants';
import { Nonce } from '@multiversx/sdk-network-providers/out/primitives';
import BigNumber from 'bignumber.js';
import { RawTransactionType } from 'helpers/types';

export default function newTransaction(rawTransaction: RawTransactionType) {
  return new Transaction({
    value: new BigNumber(rawTransaction.value),
    data: new TransactionPayload(atob(rawTransaction.data)),
    nonce: new Nonce(rawTransaction.nonce),
    receiver: new Address(rawTransaction.receiver),
    gasLimit: GAS_LIMIT,
    gasPrice: GAS_PRICE,
    sender: new Address(rawTransaction.sender),
    chainID: rawTransaction.chainID.toString(),
    version: new TransactionVersion(rawTransaction.version),
    options: new TransactionOptions(rawTransaction.options)
  });
}
