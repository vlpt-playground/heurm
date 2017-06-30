import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { transitions } from 'lib/styleUtils';

const Wrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: ${oc.red[7]};
    font-weight: 500;
    text-align: center;
    animation: ${transitions.shake} 0.3s ease-in;
    animation-fill-mode: forwards;
`;

const AuthError = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
);

export default AuthError;