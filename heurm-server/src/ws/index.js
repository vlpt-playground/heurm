const Router = require('koa-router');

const ws = new Router();

let counter = 0;

ws.get('/ws', (ctx, next) => {
    // 유저가 접속하면 이 코드들이 실행됩니다
    ctx.websocket.id = counter++; // 해당 소켓에 id 부여
    ctx.websocket.send('Hello, user ' + ctx.websocket.id);

    // 유저가 메시지를 보냈을때
    ctx.websocket.on('message', function(message) {
        console.log(message);
        ctx.websocket.send('pong');
    });

    // 유저가 나갔을 때
    ctx.websocket.on('close', () => {
        console.log(`User ${ctx.websocket.id} has left.`);
    });
});

module.exports = ws;