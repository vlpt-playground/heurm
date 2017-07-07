import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import home from './home';

import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    auth,
    user,
    home,
    pender: penderReducer
});