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

    // 다음 목록 불러오기
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



    // 스크롤 리스너
    handleScroll = () => {
        const { nextData } = this.props;
        if(nextData.size === 0) return; // 미리 불러온 데이터 없으면 작업 중지

        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        // IE 에서는 body.scrollTop 대신에 document.documentElement.scrollTop 사용해야함
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeight - scrollTop < 100) {
            this.loadNext();
        }
    }

    componentDidMount() {
        // 컴포넌트가 마운트 됐을 때 호출 합니다.
        this.load();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        // 컴포넌트가 언마운트 될 때에는 스크롤 이벤트리스너를 제거합니다
        window.removeEventListener('scroll', this.handleScroll);
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
        data: state.posts.get('data'),
        nextData: state.posts.get('nextData')
    }),
    (dispatch) => ({
        PostsActions: bindActionCreators(postsActions, dispatch)
    })
)(PostListContainer);
