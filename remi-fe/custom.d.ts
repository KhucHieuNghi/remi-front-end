/* eslint-disable import/no-duplicates */
/* eslint-disable no-undef */
/// <reference path="../../node_modules/@types/react/index.d.ts"/>

declare module '*.svg' {
    import { FunctionComponent } from 'react';

    const content: FunctionComponent<{
        className?: string;
    }>;

    // noinspection JSDuplicatedDeclaration
    export default content;
}

declare type Enumerable<T> = {
    [P in keyof T]: T[P];
};
