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
const TOGGLE_COMMENTS = 'posts/TOGGLE_COMMENTS'; // 코멘트 토글
const CHANGE_COMMENT_INPUT = 'posts/CHANGE_COMMENT_INPUT'; // 댓글 인풋 수정
const COMMENT = 'posts/COMMENT'; // 댓글 작성

export const loadPost = createAction(LOAD_POST, PostsAPI.list);
export const prefetchPost = createAction(PREFETCH_POST, PostsAPI.next); // URL
export const showPrefetchedPost = createAction(SHOW_PREFETCHED_POST);
export const likePost = createAction(LIKE_POST, PostsAPI.like, (payload) => payload); // postId, meta 값 설정
export const unlikePost = createAction(UNLIKE_POST, PostsAPI.unlike, (payload) => payload); // postId, meta 값 설정
export const toggleComments = createAction(TOGGLE_COMMENTS); // index
export const changeCommentInput = createAction(CHANGE_COMMENT_INPUT); // { index, value }
export const comment = createAction(COMMENT, PostsAPI.comment, ({postId})=>postId); // { postId, text }

const initialState = Map({
    next: '',
    data: List(),
    nextData: List(),
    comments: Map({
        visible: Map({}),
        value: Map({})
    })
});

export default handleActions({
    ...pender({
        type: LOAD_POST,
        onPending: (state, action) => state.set('data', List()).set('nextData', List()), // 리스트 비우기
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
            const index = state.get('data').findIndex(post=>post.get('_id') === action.meta);
            return state.updateIn(
                ['data', index], 
                (post)=> post.set('liked', true) // liked 값을 true 로 바꾸고
                             .update('likedCount', count => count + 1) // likedCount 값을 1 더함
            );
        },
        // 요청 끝나면 실 서버값으로 설정
        onSuccess: (state, action) => {
            const index = state.get('data').findIndex(post=>post.get('_id') === action.meta)
            return state.setIn(['data', index, 'likesCount'], action.payload.data.likesCount) 
        }
    }),
    ...pender({
        type: UNLIKE_POST,
        onPending: (state, action) => {
            const index = state.get('data').findIndex(post=>post.get('_id') === action.meta);
            return state.updateIn(
                ['data', index], 
                (post)=> post.set('liked', false) // liked 값을 false 로 바꾸고
                             .update('likedCount', count => count - 1) // likedCount 값을 1 뺌
            );
        },
        // 요청 끝나면 실 서버값으로 설정
        onSuccess: (state, action) => {
            const index = state.get('data').findIndex(post=>post.get('_id') === action.meta);
            return state.setIn(['data', index, 'likesCount'], action.payload.data.likesCount);
        }
    }),
    [TOGGLE_COMMENTS]: (state, action) => {
        const current = state.getIn(['comments', action.payload]);
        if(!current) {
            return state.setIn(['comments', action.payload], Map({ visible: true, value: '' }));
        } else {
            return state.deleteIn(['comments', action.payload]);
        }
    },
    [CHANGE_COMMENT_INPUT]: (state, action) => {
        return state.setIn(['comments', action.payload.postId, 'value'], action.payload.value);
    },
    ...pender({
        type: COMMENT,
        onPending: (state, action) => {
            return state.setIn(['comments', action.meta, 'value'], '');
        },
        onSuccess: (state, action) => {
            const index = state.get('data').findIndex((post) => post.get('_id') === action.meta);
            return state.setIn(['data', index, 'comments'], fromJS(action.payload.data));
        }
    })
}, initialState);