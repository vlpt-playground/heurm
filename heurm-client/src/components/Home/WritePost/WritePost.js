import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import Textarea from 'react-textarea-autosize';
import Progress from './Progress';

const Wrapper = styled.div`
    width: 768px;
    margin: 0 auto;
    padding: 1rem;
    background: ${oc.gray[7]};
    position: relative;
    ${shadow(1)}
    ${media.tablet`
        width: 100%;
    `}
`;

const StyledTextarea = styled(Textarea)`
    width: 100%;
    background: transparent;
    border: none;
    resize: none;
    outline: none;
    font-size: 1.5rem;
    font-weight: 300;
    color: white;
    ::placeholder {
        color: ${oc.gray[3]};
    }
    ${media.tablet`
        font-size: 1rem;
    `}
`;

const WritePost = ({children, onChange, onPost, value}) => (
    <Wrapper>
        <StyledTextarea 
            minRows={5} 
            maxRows={10} 
            placeholder={`의식의 흐름대로 당신의 생각을 적어보세요.\n잠시라도 입력을 멈추면 자동으로 포스팅됩니다.`} 
            onChange={onChange} 
            value={value}
            onPaste={e=>e.preventDefault()}
        />
        <Progress value={value} onPost={onPost}/>
    </Wrapper>
);

export default WritePost;