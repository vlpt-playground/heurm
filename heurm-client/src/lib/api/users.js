import axios from 'axios';

export const getProfile = (username) => axios.get(`/api/users/${username}`);