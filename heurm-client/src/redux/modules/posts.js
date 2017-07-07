import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as PostsAPI from 'lib/api/posts';
import { pender } from 'redux-pender';

const LOAD_POST = 'posts/LOAD_POST'; // 포스트 리스트 초기 로딩
const PREFETCH_POST = 'posts/PREFETCH_POST'; // 포스트 미리 로딩
const SHOW_PREFETCHED_POST = 'posts/SHOW_PREFETCHED_POST'; // 미리 로딩된 포스트 화면에 보여주기

export const loadPost = createAction(LOAD_POST, PostsAPI.list);
export const prefetchPost = createAction(PREFETCH_POST, PostsAPI.next); // URL
export const showPrefetchedPost = createAction(SHOW_PREFETCHED_POST);

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
            // nextData 에 결과를 담아둡니다.
            const { next, data } = action.payload.data;
            return state.set('next', next)
                        .set('nextData', fromJS(data));
        }
    }),
    [SHOW_PREFETCHED_POST]: (state, action) => {
        // data 의 뒷부분에 nextData 를 붙여주고,
        // 기존의 nextData 는 비워줍니다.

        const nextData = state.get('nextData');
        return state.update('data', data => data.concat(nextData))
                    .set('nextData', List());
    }
}, initialState);