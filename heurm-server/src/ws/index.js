const Router = require('koa-router');

const ws = new Router();
const dispatcher = require('lib/dispatcher');
const shortid = require('shortid');
const channels = require('lib/channels');

function logSocket(message) {
    console.log(`[SOCKET] ${message}`);
}

const general = channels.create('general');

dispatcher.on('new_post', post => {
    general.broadcast(post);
});

ws.get('/ws', (ctx, next) => {
    const socket = ctx.websocket;
    const id = shortid.generate();

    socket.id = id;

    general.enter(socket);
    logSocket(`User ${id} is connected to server`);

    ctx.websocket.on('close', () => {
        general.leave(socket);
        console.log(`[SOCKET] ${id} is disconnected from server`);    
    });
});

module.exports = ws;
