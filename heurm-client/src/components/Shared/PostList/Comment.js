import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const CommentWrapper = styled.div`
    font-size: 0.9rem;
    & + & {
        margin-top: 0.25rem;
    }
`;

const User = styled.span`
    font-weight: 500;
    margin-right: 0.25rem;
    color: ${oc.gray[9]};
`;

const Text = styled.span`
    color: ${oc.gray[6]};
`;

const Comment = ({username, text}) => (
    <CommentWrapper>
        <User>{username}</User>
        <Text>{text}</Text>
    </CommentWrapper>
);

export default Comment;