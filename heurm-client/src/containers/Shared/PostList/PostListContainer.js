import React, { Component } from 'react';
import PostList from 'components/Shared/PostList';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postsActions from 'redux/modules/posts';
import { toast } from 'react-toastify';

class PostListContainer extends Component {

    prev = null

    // 포스트 목록 초기로딩
    load = async () => {
        const { PostsActions, username } = this.props;

        try {
            await PostsActions.loadPost(username || '');
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

    handleToggleLike = ({postId, liked}) => {
        const { PostsActions, logged } = this.props;
        
        const message = (message) => (<div style={{fontSize: '1.1rem'}}>{message}</div>);
        if(!logged) {
            return toast(message('로그인 후 이용 하실 수 있습니다.'), { type: 'error' });
        }
        if(liked) {
            PostsActions.unlikePost(postId);
        } else {
            PostsActions.likePost(postId);
        }
    }

    handleToggleComments = (postId) => {
        const { PostsActions } = this.props;
        PostsActions.toggleComments(postId);
    }

    componentDidMount() {
        this.load();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.username !== this.props.username) {
            this.load(); // 유저네임이 변경되면 새로 로딩
        }
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
        logged: state.user.get('logged'),
        next: state.posts.get('next'),
        data: state.posts.get('data')
    }),
    (dispatch) => ({
        PostsActions: bindActionCreators(postsActions, dispatch)
    })
)(PostListContainer);
