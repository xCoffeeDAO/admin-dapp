import React from 'react';
import { Address } from '@multiversx/sdk-core/out';
import { Trim } from '@multiversx/sdk-dapp/UI';
import i18next from 'i18next';
import ExplorerLink from 'components/ExplorerLink';
import { MultisigAction } from './MultisigAction';
import { MultisigActionType } from './MultisigActionType';

export class MultisigRemoveUser extends MultisigAction {
  address: Address;

  constructor(address: Address) {
    super(MultisigActionType.RemoveUser);
    this.address = address;
  }

  title() {
    return i18next.t('Remove User');
  }

  description() {
    return (
      <ExplorerLink
        page={`accounts/${this.address.bech32()}`}
        text={
          <div className='address'>
            <Trim text={this.address.bech32()} />
          </div>
        }
      />
    );
  }

  tooltip() {
    return '';
  }
}
