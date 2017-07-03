import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PostFooter from './PostFooter';
import CommentBlockContainer from 'containers/Shared/PostList/CommentBlockContainer';
import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import { media, shadow } from 'lib/styleUtils';

const formatter = buildFormatter(koreanStrings);

const Wrapper = styled.div`
    width: calc((100% - 32px) / 3);
    ${media.desktop`
        width: calc((100% - 16px) / 2);
    `}
    ${media.tablet`
        width: 100%;
    `}
    margin-bottom: 1rem;
    background: white;
    ${shadow(1)}
`;

const PostHead = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid ${oc.gray[2]};
`;

const UserThumbnail = styled.div`
    background: ${oc.cyan[5]};
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;

const Username = styled.div`
    font-weight: 500;
    margin-left: 0.3rem;
    font-size: 0.9rem;
`;

const Count = styled.div`
    color: ${oc.gray[6]};
    margin-left: 0.3rem;
    font-size: 0.8rem;
`;

const Time = styled.div`
    color: ${oc.gray[4]};
    font-size: 0.8rem;
    margin-left: auto;
`;

const Content = styled.div`
    font-size: 1.25rem;
    color: ${oc.gray[8]};
    font-weight:300;
    padding: 1rem;
    word-break: break-word;
    white-space: pre-wrap;
`



const Post = ({post, index, onToggleLike, onToggleComments}) => {
    
    const {
        count,
        username,
        content,
        comments,
        likesCount,
        createdAt,
        liked,
        showComments,
        _id
    } = post.toJS();

    function toggleLike() {
        onToggleLike({
            index,
            postId: _id,
            liked
        });
    }

    function toggleComments() {
        onToggleComments(index);
    }

    return (
        <Wrapper>
            <PostHead>
                <UserThumbnail image={`/api/users/${username}/thumbnail`}/>
                <Username>{username}</Username>
                <Count>#{count}번째 생각</Count>
                <Time><TimeAgo date={createdAt} formatter={formatter}/></Time>
            </PostHead>
            <Content>
                {content}
            </Content>
            <PostFooter likesCount={likesCount} liked={liked} comments={comments} onToggleLike={toggleLike} onToggleComments={toggleComments}/>
            <CommentBlockContainer visible={showComments} index={index} post={post}/>
        </Wrapper>
    )
}

export default Post;