import React from 'react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Address, BigUIntValue, BytesValue } from '@multiversx/sdk-core/out';
import { Denominate, Trim } from '@multiversx/sdk-dapp/UI';
import i18next from 'i18next';
import ExplorerLink from 'components/ExplorerLink';
import { MultisigAction } from './MultisigAction';

import { MultisigActionType } from './MultisigActionType';

export class MultisigSendEgld extends MultisigAction {
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
    return '';
  }

  getData() {
    return this.functionName;
  }

  title() {
    return i18next.t('Transfer EGLD');
  }

  description() {
    return (
      <>
        <div className='d-flex flex-wrap transaction'>
          <span className='mr-1 text-body'>
            <Denominate
              value={this.amount.valueOf().toString()}
              showLastNonZeroDecimal
              showLabel
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
}
