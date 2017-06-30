const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');

api.use('/auth', auth.routes());

module.exports = api;