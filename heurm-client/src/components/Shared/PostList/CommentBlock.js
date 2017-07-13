import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    background: ${oc.gray[0]};
`;

// 인풋을 감싸줍니다
const InputWrapper = styled.div`
    padding: 0.75rem;
`;

// 기본 스타일이 무효화되고, 밑줄이 그어진 인풋, 포커스 됐을땐 밑줄 색상 변경
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
        border-bottom: 1px solid ${oc.cyan[4]};
    }

    ::placeholder {
        text-align: center;
        color: ${oc.gray[5]};
    }
`

const CommentBlock = ({onChange, onKeyPress, value}) => (
    <Wrapper>
        <InputWrapper>
            <Input 
                value={value} 
                onChange={onChange} 
                onKeyPress={onKeyPress}
                placeholder="덧글을 입력 후 [Enter] 를 눌러 작성하세요"/>
        </InputWrapper>
    </Wrapper>
);

export default CommentBlock;