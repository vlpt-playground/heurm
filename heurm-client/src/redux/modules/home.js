
import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

// action types
const CHANGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT'; // 인풋 내용 수정

// action creator
export const changeWritePostInput = createAction(CHANGE_WRITE_POST_INPUT); // value

// initial state
const initialState = Map({
    writePost: Map({
        value: ''
    })
});

// reducer
export default handleActions({
    [CHANGE_WRITE_POST_INPUT]: (state, action) => state.setIn(['writePost', 'value'], action.payload)
}, initialState);