const Router = require('koa-router');
const posts = new Router();

const postsCtrl = require('./posts.controller');
const likesCtrl = require('./likes.controller');

posts.post('/:postId/likes', likesCtrl.like);
posts.delete('/:postId/likes', likesCtrl.unlike);
posts.post('/', postsCtrl.write);
posts.get('/', postsCtrl.list);

module.exports = posts;