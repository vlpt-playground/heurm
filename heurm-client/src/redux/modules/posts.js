import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as PostsAPI from 'lib/api/posts';
import { pender } from 'redux-pender';

const LOAD_POST = 'posts/LOAD_POST'; // 포스트 리스트 초기 로딩

export const loadPost = createAction(LOAD_POST, PostsAPI.list);

const initialState = Map({
    next: '',
    data: List()
});

export default handleActions({
    ...pender({
        type: LOAD_POST,
        onSuccess: (state, action) => {
            const { next, data } = action.payload.data;
            return state.set('next', next)
                        .set('data', fromJS(data));
        }
    })
}, initialState);