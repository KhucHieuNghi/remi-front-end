// third-party
// import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';

// application
import rootReducer from './root/rootReducer';
import { FirstArgType } from './types';
import { IRootState } from './root/rootTypes';

const STORAGE_KEY = 'red-parts/react';

const saga = createSagaMiddleware();

export const save = (state: any) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const load = () => {
    if (!process.browser) {
        return undefined;
    }

    let state;

    try {
        state = localStorage.getItem(STORAGE_KEY);

        if (typeof state === 'string') {
            state = JSON.parse(state);
        }

        if (state && state.version !== 1) {
            state = undefined;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return state || undefined;
};

const bindMiddleware = (...middleware: Middleware[]) => {
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line global-require
        const { composeWithDevTools } = require('redux-devtools-extension');

        return composeWithDevTools(applyMiddleware(...middleware));
    }

    return applyMiddleware(...middleware);
};

const makeStore: MakeStore<IRootState> = () => {
    const store = createStore(rootReducer, bindMiddleware(saga));
    saga.run(rootSaga);

    return store;
};

export const wrapper = createWrapper<IRootState>(makeStore);

export type GetServerSidePropsContext = FirstArgType<FirstArgType<typeof wrapper.getServerSideProps>>
