import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';

export default combineReducers({
    base,
    auth
});