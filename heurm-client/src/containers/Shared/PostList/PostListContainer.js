import React, { Component } from 'react';
import PostList from 'components/Shared/PostList';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postsActions from 'redux/modules/posts';

class PostListContainer extends Component {

    load = async () => {
        // 가장 최근 작성된 포스트 20개를 불러옵니다.
        const { PostsActions } = this.props;
        PostsActions.loadPost();
    }

    componentDidMount() {
        // 컴포넌트가 마운트 됐을 때 호출 합니다.
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
