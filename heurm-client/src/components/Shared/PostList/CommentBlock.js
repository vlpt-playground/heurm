import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    background: ${oc.gray[0]};
`;

const InputWrapper = styled.div`
    
    padding: 0.75rem;
`;

const Input = styled.input`
    display: block;
    background: none;
    outline: none;
    border: none;
    font-size: 0.8rem;
    width: 100%;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid ${oc.gray[5]};
    &:focus {
        border-bottom: 1
        px solid ${oc.cyan[5]};
    }
`

const CommentBlock = ({visible}) => visible && (
    <Wrapper>
        <InputWrapper>
            <Input/>
        </InputWrapper>
    </Wrapper>
);

export default CommentBlock;