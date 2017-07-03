import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import HeartIcon from 'react-icons/lib/go/heart';
import CommentIcon from 'react-icons/lib/io/chatbubble';


const Wrapper = styled.div`
    padding: 1rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid ${oc.gray[1]};
    display: flex;

    color: ${oc.gray[5]};

    svg {
        font-size: 1.75rem;
        cursor: pointer;
        transition: all .15s;
    }

    span {
        margin-left: 0.25rem;
        font-size: 0.8rem;
        padding-bottom: 0.25rem;
    }
`;

const Likes = styled.div`
    display: flex;
    align-items: center;
    svg {
        &:hover {
            color: ${oc.gray[6]};
        }
        &:active {
            color: ${oc.pink[6]};
        }
    }

    ${props=>props.active && `
        svg {
            color: ${oc.pink[5]};
            &:hover {
                color: ${oc.pink[6]};
            }
        }
    `}
`;

const Comments = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    svg {
        &:hover {
            color: ${oc.gray[6]};
        }
        &:active {
            color: ${oc.cyan[6]};
        }
    }
`

const PostFooter = ({liked, likesCount=0, comments=[], onToggleLike, onCommentClick}) => (
    <Wrapper>
        <Likes active={liked}>
            <HeartIcon onClick={onToggleLike}/>
            <span>좋아요 {likesCount}개</span>
        </Likes>
        <Comments>
            <CommentIcon/>
            <span>덧글 {comments.length}개</span>
        </Comments>
    </Wrapper>
);

export default PostFooter;