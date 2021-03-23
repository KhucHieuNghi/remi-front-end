/* eslint-disable import/extensions */
import React, { ComponentType } from 'react';
import AppBase, { AppContext, AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { wrapper } from '~/store/store';
// import { AppDispatch } from '~/store/types';
import Layout from '~/components/layout';

import '../scss/index.scss';

export type AppPageType = NextComponentType<NextPageContext, any> & {
    Layout?: ComponentType,
    hideHeaderMenu?: boolean,
    hideSearch?: boolean
    hideDepartmentsMenu?:boolean
}

interface Props extends AppProps {
  // languageInitialProps: ILanguageProviderProps;
  Component: AppPageType
}

function App(props: Props) {
  const { Component, pageProps } = props;
    // const store = useStore();

  return (
      <Layout>
          <Component {...pageProps} />
      </Layout>
  );
}

App.getInitialProps = async (context: AppContext) => {
  // const dispatch = context.ctx.store.dispatch as AppDispatch;

  // dispatch(() => null);
  console.log();

  return {
      ...(await AppBase.getInitialProps(context)),
      // languageInitialProps: await getLanguageInitialProps(language),
  };
};

const WrappedApp = wrapper.withRedux(App);

export default WrappedApp;
