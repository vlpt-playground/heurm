const Router = require('koa-router');

const ws = new Router();
const dispatcher = require('lib/dispatcher');

ws.get('/ws', (ctx, next) => {
    // ctx.websocket.send('Hello World');
    // this.websocket.on('message', function(message) {
    //     console.log(message);
    // });
    dispatcher.on('NEW_POST', post => {
        ctx.websocket.send(JSON.stringify(post));
    });
});

module.exports = ws;
