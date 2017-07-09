const Router = require('koa-router');

const redis = require('redis');

// 두개의 redis 클라이언트 생성
const publisher = redis.createClient();
const subscriber = redis.createClient();

subscriber.subscribe('posts'); // posts 채널 구독

const ws = new Router();

let counter = 0;

ws.get('/ws', (ctx, next) => {
    // 유저가 접속하면 이 코드들이 실행됩니다
    ctx.websocket.id = counter++; // 해당 소켓에 id 부여
    ctx.websocket.send('Hello, user ' + ctx.websocket.id);

    // 유저가 메시지를 보냈을때
    ctx.websocket.on('message', function(message) {
        // publisher 를 통하여 posts 채널에 메시지를 발행
        publisher.publish('posts', message);
    });

    // 구독자가 message 받을 때 마다 해당 소켓에 데이터 전달
    subscriber.on('message', (channel, message) => {
        ctx.websocket.send(channel + '|' + message);
    });

    // 유저가 나갔을 때
    ctx.websocket.on('close', () => {
        console.log(`User ${ctx.websocket.id} has left.`);
    });
});

module.exports = ws;