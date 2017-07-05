require('dotenv').config(); // .env 파일에서 환경변수 불러오기

const Koa = require('koa');
const Router = require('koa-router');
const websockify = require('koa-websocket');

const app = websockify(new Koa());
const router = new Router();
const api = require('./api');

const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const { jwtMiddleware } = require('lib/token');

const ws = require('./ws');

const serve = require('koa-static');
const path = require('path');
const fs = require('fs');

mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
mongoose.connect(process.env.MONGO_URI).then(
    (response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.
app.use(jwtMiddleware);

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정
app.use(router.routes()).use(router.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());
app.use(serve(path.resolve(__dirname, '../../heurm-client/build/')));

const indexHtml = fs.readFileSync(path.resolve(__dirname, '../../heurm-client/build/index.html'), { encoding: 'utf8' });

app.use(ctx => {
    ctx.body = indexHtml;
});

app.listen(port, () => {
    console.log('heurm server is listening to port ' + port);
});