import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

// action types
const CHANGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT';

// action creator
export const changeWritePostInput = createAction(CHANGE_WRITE_POST_INPUT);

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