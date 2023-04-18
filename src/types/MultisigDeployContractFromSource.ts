import { Address, BigUIntValue, BytesValue } from '@multiversx/sdk-core/out';
import { denominate } from '@multiversx/sdk-dapp/utils';
import i18next from 'i18next';

import { MultisigAction } from './MultisigAction';
import { MultisigActionType } from './MultisigActionType';
import { denomination } from '../config';

export class MultisigDeployContractFromSource extends MultisigAction {
  amount: BigUIntValue;
  source: Address;
  upgradeable: boolean;
  payable: boolean;
  readable: boolean;
  args: BytesValue[];

  constructor(
    amount: BigUIntValue,
    source: Address,
    upgradeable = false,
    payable = false,
    readable = false,
    args: BytesValue[] = []
  ) {
    super(MultisigActionType.SCDeployFromSource);
    this.amount = amount;
    this.source = source;
    this.upgradeable = upgradeable;
    this.payable = payable;
    this.readable = readable;
    this.args = args;
  }

  title() {
    return i18next.t('Deploy Contract from source');
  }

  getData() {
    const hasArgs =
      this.args.length > 1 && this.args[0].valueOf().toString().length > 0;
    return `Deploy from ${this.source.bech32()}  ${
      hasArgs
        ? '/ arguments: ' +
          this.args.map((arg) => arg.valueOf().toString('hex'))
        : ''
    }`;
  }

  description() {
    const denominatedAmount = denominate({
      input: this.amount.valueOf().toString(),
      denomination: denomination,
      decimals: 4,
      showLastNonZeroDecimal: true
    });
    return `${i18next.t('Amount')}: ${denominatedAmount}`;
  }

  tooltip(): string {
    return ` upgradeable: ${this.upgradeable}
 payable: ${this.payable} 
 readable: ${this.readable} 
    `;
  }
}
