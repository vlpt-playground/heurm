import React, { Component } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import Post from './Post';

const Wrapper = styled.div`
    position: relative;
    margin-top: 1rem;
`;

class PostList extends Component {

    handleRelayout = () => {
        setTimeout(() => this.masonry.masonry.layout(), 0);
    }

    render() {
        const { posts, onToggleLike, onToggleComments } = this.props;

        const postList = posts.map(
            (post, index) => (
                <Post 
                    key={post.get('_id')} 
                    post={post} 
                    onToggleLike={onToggleLike} 
                    onToggleComments={onToggleComments} 
                    onRelayout={this.handleRelayout}
                />
            )
        );

        return (
            <Wrapper>
                <Masonry options={{gutter: 16}} ref={ref=>{this.masonry=ref}}>
                    {postList}
                </Masonry>
            </Wrapper>
        );
    }
}

export default PostList;