import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import Post from './Post';

const Wrapper = styled.div`
    position: relative;
    margin-top: 1rem;
`;

const PostList = ({posts}) => {
    const postList = posts.map(
        (post) => (
            <Post key={post.get('_id')} post={post}/>
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