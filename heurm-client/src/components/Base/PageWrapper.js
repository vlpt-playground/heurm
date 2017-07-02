import React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'lib/styleUtils';

// 헤더 아래에 위치하도록 상단 패딩
const Wrapper = styled.div`
    margin-top: 58px;
    padding: 1rem;

    ${props => props.responsive && css`
        width: 1200px;
        margin-left: auto;
        margin-right: auto;

        ${media.wide`
            width: 992px;
        `}

        ${media.desktop`
            width: 100%;
        `}
    `}

`;

const PageWrapper = ({responsive, children}) => (
    <Wrapper responsive={responsive}>
        {children}
    </Wrapper>
);

export default PageWrapper;