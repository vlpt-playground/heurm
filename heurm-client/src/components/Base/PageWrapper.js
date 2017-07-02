import React from 'react';
import styled from 'styled-components';

// 헤더 아래에 위치하도록 상단 패딩
const Wrapper = styled.div`
    padding-top: 58px;
`;

const PageWrapper = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
);

export default PageWrapper;