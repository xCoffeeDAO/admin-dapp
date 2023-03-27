import React from 'react';
import {
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList
} from '@multiversx/sdk-dapp/UI';
import {
  AxiosInterceptorContext,
  DappProvider
} from '@multiversx/sdk-dapp/wrappers';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { germanTranslations } from 'i18n/de';
import { englishTranslations } from 'i18n/en';
import { persistor, store } from 'redux/store';
import Layout from './components/Layout';
import PageNotFound from './components/PageNotFound';

import { sampleAuthenticatedDomains, walletConnectV2ProjectId } from './config';
import routes from './routes';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: englishTranslations
    },
    de: {
      translation: germanTranslations
    }
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  }
});

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AxiosInterceptorContext.Provider>
        <AxiosInterceptorContext.Interceptor
          authenticatedDomanis={sampleAuthenticatedDomains}
        >
          <Router basename={process.env.PUBLIC_URL}>
            <DappProvider
              environment={EnvironmentsEnum.devnet}
              customNetworkConfig={{
                name: 'customConfig',
                walletConnectV2ProjectId: walletConnectV2ProjectId
              }}
            >
              <>
                <Layout>
                  <AxiosInterceptorContext.Listener />
                  <SignTransactionsModals />
                  <TransactionsToastList />
                  <NotificationModal />

                  <PersistGate loading={null} persistor={persistor}>
                    <Routes>
                      {routes.map((route, i) => (
                        <Route
                          path={route.path}
                          key={route.path + i}
                          element={<route.component />}
                        />
                      ))}
                      <Route element={<PageNotFound />} />
                    </Routes>
                  </PersistGate>
                </Layout>
              </>
            </DappProvider>
          </Router>
        </AxiosInterceptorContext.Interceptor>
      </AxiosInterceptorContext.Provider>
    </ReduxProvider>
  );
}
