import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as PostsAPI from 'lib/api/posts';
import { pender } from 'redux-pender';

const LOAD_POST = 'posts/LOAD_POST'; // 포스트 리스트 초기 로딩
const PREFETCH_POST = 'posts/PREFETCH_POST'; // 포스트 미리로딩
const SHOW_PREFETCHED_POST = 'posts/SHOW_PREFETCHED_POST'; // 미리 로딩된 포스트 화면에 보여주기
const RECEIVE_NEW_POST = 'posts/RECEIVE_NEW_POST'; // 새 포스트를 받아온다
const LIKE_POST = 'posts/LIKE_POST'; // 포스트 좋아요
const UNLIKE_POST = 'posts/UNLIKE_POST'; // 포스트 좋아요 취소

export const loadPost = createAction(LOAD_POST, PostsAPI.list);
export const prefetchPost = createAction(PREFETCH_POST, PostsAPI.next); // URL
export const showPrefetchedPost = createAction(SHOW_PREFETCHED_POST);
export const likePost = createAction(LIKE_POST, ({postId}) => PostsAPI.like(postId), ({index}) => index); // {postId,index} index 를 메타 값으로 설정
export const unlikePost = createAction(UNLIKE_POST, ({postId}) => PostsAPI.unlike(postId), ({index}) => index); // {postId,index} index 를 메타 값으로 설정

const initialState = Map({
    next: '',
    data: List(),
    nextData: List()
});

export default handleActions({
    ...pender({
        type: LOAD_POST,
        onSuccess: (state, action) => {
            const { next, data } = action.payload.data;
            return state.set('next', next)
                        .set('data', fromJS(data));
        }
    }),
    ...pender({
        type: PREFETCH_POST,
        onSuccess: (state, action) => {
            const { next, data } = action.payload.data;
            return state.set('next', next)
                        .set('nextData', fromJS(data));
        }
    }),
    [SHOW_PREFETCHED_POST]: (state, action) => {
        const nextData = state.get('nextData');

        return state.update('data', data => data.concat(nextData))
                    .set('nextData', List());
    },
    [RECEIVE_NEW_POST]: (state, action) => {
        return state.update('data', data => data.unshift(fromJS(action.payload)));
    },
    ...pender({
        type: LIKE_POST,
        onPending: (state, action) => {
            return state.updateIn(
                ['data', action.meta], 
                (post)=> post.set('liked', true) // liked 값을 true 로 바꾸고
                             .update('likedCount', count => count + 1) // likedCount 값을 1 더함
            );
        },
        // 요청 끝나면 실 서버값으로 설정
        onSuccess: (state, action) => state.setIn(['data', action.meta, 'likesCount'], action.payload.data.likesCount) 
    }),
    ...pender({
        type: UNLIKE_POST,
        onPending: (state, action) => {
            return state.updateIn(
                ['data', action.meta], 
                (post)=> post.set('liked', false) // liked 값을 false 로 바꾸고
                             .update('likedCount', count => count - 1) // likedCount 값을 1 뺌
            );
        },
        // 요청 끝나면 실 서버값으로 설정
        onSuccess: (state, action) => state.setIn(['data', action.meta, 'likesCount'], action.payload.data.likesCount) 
    })
}, initialState);