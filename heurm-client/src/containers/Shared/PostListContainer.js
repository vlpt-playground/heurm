import React, { Component } from 'react';
import PostList from 'components/Shared/PostList';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postsActions from 'redux/modules/posts';

class PostListContainer extends Component {

    // 포스트 목록 초기로딩
    load = () => {
        const { PostsActions } = this.props;
        PostsActions.loadPost();
    }

    componentDidMount() {
        this.load();
    }
    
    render() {
        const { data } = this.props;

        return (
            <PostList posts={data}/>
        );
    }
}

export default connect(
    (state) => ({
        next: state.posts.get('next'),
        data: state.posts.get('data')
    }),
    (dispatch) => ({
        PostsActions: bindActionCreators(postsActions, dispatch)
    })
)(PostListContainer);
