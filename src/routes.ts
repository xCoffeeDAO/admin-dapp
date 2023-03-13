import React from 'react';
import { RouteType as DappCoreRouteTypes } from '@elrondnetwork/dapp-core';
import { dAppName } from 'config';
import Unlock from 'pages/Unlock';
import withPageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MultisigDetailsPage from './pages/MultisigDetails/MultisigDetailsPage';

type RouteType = DappCoreRouteTypes & { title: string };

export type ForegroundRoutesType =
  | 'unlock'
  | 'home'
  | 'dashboard'
  | 'multisig'
  | 'multisigAddress';
export type ModalRoutesType = 'walletconnect' | 'ledger';

export const foregroundRoutes: Record<ForegroundRoutesType, RouteType> = {
  home: {
    path: '/',
    title: 'Home',
    component: Home
  },
  dashboard: {
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  multisigAddress: {
    path: '/multisig/:multisigAddressParam',
    title: 'Multisig',
    component: MultisigDetailsPage,
    authenticatedRoute: true
  },
  multisig: {
    path: '/multisig',
    title: 'Multisig Details',
    component: Dashboard,
    authenticatedRoute: true
  },
  unlock: {
    path: '/unlock',
    title: 'Unlock',
    component: Unlock
  }
};

export const foregroundRouteNames = Object.keys(foregroundRoutes).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: foregroundRoutes[cur as ForegroundRoutesType].path
  }),
  {} as Record<ForegroundRoutesType, string>
);

export const routeNames = {
  ...foregroundRouteNames
};

const routes: RouteType[] = [
  ...Object.keys(foregroundRoutes).map((route) => {
    const { path, title, authenticatedRoute, component } =
      foregroundRoutes[route as ForegroundRoutesType];
    return { path, title, authenticatedRoute, component };
  })
];

const wrappedRoutes = () =>
  routes.map((route) => {
    const title = `${dAppName}`;
    return {
      path: route.path,
      authenticatedRoute: Boolean(route.authenticatedRoute),
      component: withPageTitle(
        title,
        route.component
      ) as any as React.ComponentClass<any, any>
    };
  });

export default wrappedRoutes();
