import React, { Component } from 'react';
import PostList from 'components/Shared/PostList';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postsActions from 'redux/modules/posts';

class PostListContainer extends Component {

    prev = null

    // 포스트 목록 초기로딩
    load = async () => {
        const { PostsActions } = this.props;

        try {
            await PostsActions.loadPost();
            const { next } = this.props;

            if(next) {
                // 다음 불러올 포스트들이 있다면 미리 로딩을 해둔다
                await PostsActions.prefetchPost(next);
            }
        } catch (e) {
            console.log(e);
        }

    }

    loadNext = async () => {
        const { PostsActions, next } = this.props;
        
        PostsActions.showPrefetchedPost(); // 미리 불러왔던걸 보여준 다음에

        if(next === this.prev || !next) return; // 이전에 했던 요청과 동일하면 요청하지 않는다.
        this.prev = next;

        
        try {
            await PostsActions.prefetchPost(next);
        } catch (e) {
            console.log(e);
        }
        this.handleScroll(); // 한번 더 호출함으로써, 인터넷 느린 상황에 밀리는 현상 방지
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    

    handleScroll = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        // IE 에서는 body.scrollTop 대신에 document.documentElement.scrollTop 사용해야함
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeight - scrollTop < 100) {
            this.loadNext();
        }
    }

    handleToggleLike = ({postId, index, liked}) => {
        const { PostsActions } = this.props;
        if(liked) {
            PostsActions.unlikePost({postId, index});
        } else {
            PostsActions.likePost({postId, index});
        }
    }

    handleToggleComments = (index) => {
        const { PostsActions } = this.props;
        PostsActions.toggleComments(index);
    }

    componentDidMount() {
        this.load();
        window.addEventListener('scroll', this.handleScroll);
    }
    
    render() {
        const { data } = this.props;
        const { handleToggleLike, handleToggleComments } = this;

        return (
            <PostList posts={data} onToggleLike={handleToggleLike} onToggleComments={handleToggleComments}/>
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
