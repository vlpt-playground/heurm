import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import Post from './Post';

const Wrapper = styled.div`
    position: relative;
    margin-top: 1rem;
`;

const PostList = () => (
    <Wrapper>
        <Masonry options={{gutter: 16}}>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </Masonry>
    </Wrapper>
);

export default PostList;