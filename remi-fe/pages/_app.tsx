/* eslint-disable import/extensions */
import React, { ComponentType } from 'react';
import AppBase, { AppContext, AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { useStore } from 'react-redux';
import Head from 'next/head';
import { load, save, wrapper } from '~/store/store';
// import { AppDispatch } from '~/store/types';

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

  return <Component {...pageProps} />;
}

App.getInitialProps = async (context: AppContext) => {
  // const dispatch = context.ctx.store.dispatch as AppDispatch;
  console.log();

  // await dispatch(optionsSetAll({
  //     desktopHeaderVariant: config.desktopHeaderVariant,
  //     mobileHeaderVariant: config.mobileHeaderVariant,
  // }));

  // let language;

  // if (typeof context.ctx.query.lang === 'string') {
  //     language = getLanguageByLocale(context.ctx.query.lang);
  // } else {
  //     language = getLanguageByPath(context.ctx.asPath || context.ctx.pathname);
  // }

  return {
      ...(await AppBase.getInitialProps(context)),
      // languageInitialProps: await getLanguageInitialProps(language),
  };
};

const WrappedApp = wrapper.withRedux(App);

// noinspection JSUnusedGlobalSymbols
export default WrappedApp;

// export default MyApp;
