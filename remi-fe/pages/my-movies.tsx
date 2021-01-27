import React from 'react';
import styled from '@emotion/styled';
import ShareMovie from '~/components/shares/ShareMovie';

const Wrapper = styled.section`
    svg{
        max-width: 30px;
    }
`;

export default () => {
    console.log();

    return (
        <Wrapper>
            <ShareMovie />
            <ShareMovie />

        </Wrapper>
    );
};
