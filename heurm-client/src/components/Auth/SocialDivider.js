import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const Or = styled.div`
    text-align: center;
    color: ${oc.gray[5]};
`;

const SocialDivider = () => (
    <Wrapper>
        <Or>또는 소셜계정으로 로그인</Or>
    </Wrapper>
);

export default SocialDivider;