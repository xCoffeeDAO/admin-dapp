import React from 'react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Address,
  BigUIntType,
  BigUIntValue,
  BinaryCodec,
  BytesValue,
  U32Type,
  U32Value
} from '@multiversx/sdk-core/out';
import { Denominate, Trim } from '@multiversx/sdk-dapp/UI';
import i18next from 'i18next';
import startCase from 'lodash/startCase';
import ExplorerLink from 'components/ExplorerLink';
import { MultisigAction } from './MultisigAction';

import { MultisigActionType } from './MultisigActionType';
import { multisigContractFunctionNames } from './multisigFunctionNames';
import { denominate } from '@multiversx/sdk-dapp/utils';

export class MultisigSmartContractCall extends MultisigAction {
  address: Address;
  amount: BigUIntValue;
  functionName: string;
  args: BytesValue[];

  constructor(
    address: Address,
    amount: BigUIntValue,
    functionName: string,
    args: BytesValue[] = []
  ) {
    super(MultisigActionType.SendTransferExecute);
    this.address = address;
    this.amount = amount;
    this.functionName = functionName;
    this.args = args;
  }

  tooltip() {
    switch (this.functionName) {
      case multisigContractFunctionNames.issue:
        return this.getIssueTokenToolTip();
    }

    return '';
  }

  getData() {
    switch (this.functionName) {
      case multisigContractFunctionNames.issue:
      case multisigContractFunctionNames.ESDTTransfer:
        return null;
    }
    return `${this.functionName}${this.args.map(
      (arg) => `@${arg.valueOf().toString('hex')}`
    )}`;
  }

  title() {
    switch (this.functionName) {
      case multisigContractFunctionNames.issue:
        return i18next.t('Issue Token');
      case multisigContractFunctionNames.ESDTTransfer:
        return i18next.t('Send Token');
    }
    return i18next.t('Smart contract call');
  }

  description(decimals?: number) {
    switch (this.functionName) {
      case multisigContractFunctionNames.issue:
        return this.getIssueTokenDescription();
      case multisigContractFunctionNames.ESDTTransfer:
        return this.getSendTokenDescription(decimals);
    }
    return (
      <>
        <div className='d-flex flex-wrap transaction'>
          <span className='mr-1 text-body'>
            <Denominate
              value={this.amount.valueOf().toString()}
              showLastNonZeroDecimal
              showLabel
              denomination={decimals}
            />
          </span>
          <span className='mr-1'>{String(i18next.t('to'))}</span>
          <div className='address'>
            <Trim text={this.address.bech32()} />
            <ExplorerLink
              page={`accounts/${this.address.bech32()}`}
              text={<FontAwesomeIcon icon={faExternalLinkAlt} size='sm' />}
              className='link-second-style'
            />
          </div>
        </div>
      </>
    );
  }

  getIdentifier() {
    return this.args[0]?.valueOf()?.toString();
  }

  getIssueTokenToolTip(): string {
    const extraProperties = [];
    let index = 4;
    while (index < this.args.length) {
      const name = this.args[index++].valueOf();
      const value = this.args[index++].valueOf();

      extraProperties.push({ name, value });
    }

    return extraProperties
      .map((x) => `${startCase(String(x.name))}: ${x.value}`)
      .join('\n');
  }

  getSendTokenDescription(decimals = 0): string {
    const codec = new BinaryCodec();
    const input = codec
      .decodeTopLevel<BigUIntValue>(this.args[1].valueOf(), new BigUIntType())
      .valueOf();

    const amount = denominate({
      input: String(input),
      decimals,
      showLastNonZeroDecimal: false,
      denomination: decimals
    });

    return `${i18next.t('Identifier')}: ${this.getIdentifier()}, ${i18next.t(
      'Amount'
    )}: ${amount}`;
  }

  getIssueTokenDescription(): string {
    const name = this.args[0].valueOf().toString();
    const identifier = this.args[1].valueOf().toString();

    const codec = new BinaryCodec();
    const amount = codec
      .decodeTopLevel<BigUIntValue>(this.args[2].valueOf(), new BigUIntType())
      .valueOf();
    const decimals = codec
      .decodeTopLevel<U32Value>(this.args[3].valueOf(), new U32Type())
      .valueOf()
      .toNumber();

    const amountString = amount
      .toString()
      .slice(0, amount.toString().length - decimals);

    return `${i18next.t('Name')}: ${name}, ${i18next.t(
      'Identifier'
    )}: ${identifier}, ${i18next.t('Amount')}: ${amountString}, ${i18next.t(
      'Decimals'
    )}: ${decimals}`;
  }
}
