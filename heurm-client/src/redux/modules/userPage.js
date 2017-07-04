import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as UsersAPI from 'lib/api/users';

const GET_PROFILE = 'userPage/GET_PROFILE';

export const getProfile = createAction(GET_PROFILE, UsersAPI.getProfile);

const initialState = Map({
    profile: Map({
        profile: Map({ 
            thumbnail: null,
            username: null
        }),
        thoughtCount: null
    })
});

// reducer
export default handleActions({
    ...pender({
        type: GET_PROFILE,
        onSuccess: (state, action) => state.set('profile', fromJS(action.payload.data))
    })
}, initialState);