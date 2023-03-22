import React, { useEffect } from 'react';
import { useGetAccountInfo, useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountData } from 'apiCalls/accountCalls';
import { getEconomicsData } from 'apiCalls/economicsCalls';
import { getUserMultisigContractsList } from 'apiCalls/multisigContractsCalls';
import { setAccountData } from 'redux/slices/accountSlice';
import { setEconomics } from 'redux/slices/economicsSlice';
import { setMultisigContracts } from 'redux/slices/multisigContractsSlice';
import routes, { routeNames } from 'routes';
import { accessTokenServices, storageApi } from 'services/accessTokenServices';
import { uniqueContractAddress, uniqueContractName } from '../../config';
import { TokenWrapper } from '../TokenWrapper';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { loginMethod, isLoggedIn } = useGetLoginInfo();
  const { address } = useGetAccountInfo();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = loginMethod != '';
  React.useEffect(() => {
    if (loggedIn) {
      refreshAccount();
      fetchAccountData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  React.useEffect(() => {
    fetchEconomics();
  }, []);

  useEffect(() => {
    readMultisigContracts();
  }, [address]);

  async function readMultisigContracts() {
    if (uniqueContractAddress || storageApi == null) {
      dispatch(
        setMultisigContracts([
          { address: uniqueContractAddress, name: uniqueContractName ?? '' }
        ])
      );
      navigate('/multisig/' + uniqueContractAddress);
      return;
    }
    if (isLoggedIn) {
      const contracts = await getUserMultisigContractsList();
      dispatch(setMultisigContracts(contracts));
    }
  }

  async function fetchEconomics() {
    const economics = await getEconomicsData();
    if (economics !== null) {
      dispatch(setEconomics(economics));
    }
  }

  async function fetchAccountData() {
    const accountData = await getAccountData(address);
    if (accountData !== null) {
      dispatch(setAccountData(accountData));
    }
  }

  return (
    <div className='bg-light d-flex flex-column flex-fill wrapper'>
      <Navbar />

      <main className='d-flex flex-row flex-fill position-relative justify-center  container'>
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={routeNames.unlock}
        >
          {children}
        </AuthenticatedRoutesWrapper>
        {/*<TokenWrapper />*/}
      </main>
    </div>
  );
};

export default Layout;
