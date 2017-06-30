const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(1);
    const started = new Date();
    await next();
    console.log(new Date() - started + 'ms');
});


app.use((ctx, next) => {
    console.log(2);
    next();
});



app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(4000, () => {
    console.log('heurm server is listening to port 4000');
});