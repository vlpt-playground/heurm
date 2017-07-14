import axios from 'axios';

export const getUserInfo = (username) => axios.get(`/api/users/${username}`);