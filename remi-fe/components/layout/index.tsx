import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import Header from './Header';

interface Props {
    children: PropsWithChildren<any>
}

const Layout = styled.section`

`;

export default ({ children }: Props) => {
    console.log();

    return (
        <Layout>
            <Header />
            <section className="container text-center">
                {children}
            </section>
        </Layout>
    );
};
