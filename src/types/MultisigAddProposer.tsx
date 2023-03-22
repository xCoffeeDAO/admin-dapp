import React from 'react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Address } from '@multiversx/sdk-core/out';
import { Trim } from '@multiversx/sdk-dapp/UI';
import i18next from 'i18next';
import ExplorerLink from 'components/ExplorerLink';

import { MultisigAction } from './MultisigAction';
import { MultisigActionType } from './MultisigActionType';

export class MultisigAddProposer extends MultisigAction {
  address: Address;

  constructor(address: Address) {
    super(MultisigActionType.AddProposer);
    this.address = address;
  }

  title() {
    return i18next.t('Add Proposer');
  }

  description() {
    return (
      <>
        <div className='address'>
          <Trim text={this.address.bech32()} />
          <ExplorerLink
            page={`accounts/${this.address.bech32()}`}
            text={<FontAwesomeIcon icon={faExternalLinkAlt} size='sm' />}
            className='link-second-style'
          />
        </div>
      </>
    );
  }

  tooltip() {
    return '';
  }
}
