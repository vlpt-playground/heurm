import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const Wrapper = styled.div`
    width: 768px;
    margin: 0 auto;
    padding: 1rem;
    background: ${oc.gray[7]};
    ${shadow(1)}
`;

const WritePost = ({children}) => (
    <Wrapper>

    </Wrapper>
);

export default WritePost;