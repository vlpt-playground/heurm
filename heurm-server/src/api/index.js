const Router = require('koa-router');

const api = new Router();
const books = require('./books');

api.use('/books', books.routes());

module.exports = api;