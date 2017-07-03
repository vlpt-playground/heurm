import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import Post from './Post';

const Wrapper = styled.div`
    position: relative;
    margin-top: 1rem;
`;

const PostList = ({posts, onToggleLike, onToggleComments}) => {
    const postList = posts.map(
        (post, index) => (
            <Post key={post.get('_id')} post={post} index={index} onToggleLike={onToggleLike} onToggleComments={onToggleComments}/>
        )
    )
    return (
        <Wrapper>
            <Masonry options={{gutter: 16}}>
                {postList}
            </Masonry>
        </Wrapper>
    );
}

export default PostList;