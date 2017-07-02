import axios from 'axios';

export const write = (content) => axios.get('/api/posts', { content });
export const list = () => axios.get('/api/posts');
export const listOfUser = (username) => axios.get(`/api/posts?username=${username}`);
export const next = (url) => axios.get(url);