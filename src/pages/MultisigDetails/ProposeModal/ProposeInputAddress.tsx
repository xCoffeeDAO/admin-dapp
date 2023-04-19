import React, { useState } from 'react';
import { Address } from '@multiversx/sdk-core/out';
import { useTranslation } from 'react-i18next';

interface ProposeInputAddressType {
  handleParamsChange: (params: Address) => void;
  setSubmitDisabled: (value: boolean) => void;
  invalidAddress?: boolean;
  disabled?: boolean;
}

const ProposeInputAddress = ({
  handleParamsChange,
  setSubmitDisabled,
  invalidAddress,
  disabled
}: ProposeInputAddressType) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const handleAddressChanged = (event: any) => {
    const newAddress = String(event.target.value);
    try {
      const parsedValue = new Address(newAddress);
      setError(false);
      setAddress(newAddress);
      handleParamsChange(parsedValue);
      setSubmitDisabled(false);
    } catch (err) {
      setSubmitDisabled(true);
      setAddress(newAddress);
      setError(true);
    }
  };

  return (
    <div className='modal-control-container'>
      <label>{String(t('Address'))} </label>
      <input
        type='text'
        disabled={disabled}
        className='form-control'
        value={address}
        autoComplete='off'
        onChange={handleAddressChanged}
      />
      {error && <p className='text-danger'>{String(t('Invalid address'))}</p>}
      {invalidAddress && !error && (
        <p className='text-danger'>
          {String(t('This is not a valid multisig address'))}
        </p>
      )}
    </div>
  );
};

export default ProposeInputAddress;
