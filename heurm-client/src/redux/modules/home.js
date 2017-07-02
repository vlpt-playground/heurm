import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

import { pender } from 'redux-pender';
import * as PostsAPI from 'lib/api/posts';

// action types
const CHANGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT';
const WRITE_POST = 'home/WRITE_POST';

// action creator
export const changeWritePostInput = createAction(CHANGE_WRITE_POST_INPUT);
export const writePost = createAction(WRITE_POST, PostsAPI.write);

// initial state
const initialState = Map({
    writePost: Map({
        value: ''
    })
});

// reducer
export default handleActions({
    [CHANGE_WRITE_POST_INPUT]: (state, action) => state.setIn(['writePost', 'value'], action.payload),
    ...pender({
        type: WRITE_POST,
        onPending: (state, action) => state.setIn(['writePost', ''])
    })
}, initialState);