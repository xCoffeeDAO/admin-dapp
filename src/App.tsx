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
import { Unlock } from 'pages/Unlock';
import { persistor, store } from 'redux/store';
import Layout from './components/Layout';
import PageNotFound from './components/PageNotFound';

import { sampleAuthenticatedDomains } from './config';
import routes, { routeNames } from './routes';

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
          <DappProvider environment={'devnet'}>
            <>
              <SignTransactionsModals />
              <TransactionsToastList />
              <NotificationModal />
              <Router basename={process.env.PUBLIC_URL}>
                <PersistGate loading={null} persistor={persistor}>
                  <Layout>
                    <Routes>
                      <Route path={routeNames.unlock} element={<Unlock />} />
                      {routes.map((route, i) => (
                        <Route
                          path={route.path}
                          key={route.path + i}
                          element={<route.component />}
                        />
                      ))}
                      <Route element={<PageNotFound />} />
                    </Routes>
                  </Layout>
                </PersistGate>
              </Router>
            </>
          </DappProvider>
        </AxiosInterceptorContext.Interceptor>
      </AxiosInterceptorContext.Provider>
    </ReduxProvider>
  );
}
