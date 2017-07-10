const Account = require('models/account');
const redis = require('redis');

const client = redis.createClient();

exports.getProfile = async (ctx) => {
    const { username } = ctx.params;

    let account;
    try {
        account = await Account.findByUsername(username);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account) {
        ctx.status = 404;
        return;
    }

    ctx.body = {
        profile: account.profile,
        thoughtCount: account.thoughtCount
    };
};

const getCache = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if(err) reject(err);
            if(!data) resolve(null);
            resolve(data);
        });
    });
};

exports.getThumbnail = async (ctx) => {
    const { username } = ctx.params;
    const key = `${username}:thumbnail`;

    const thumbnail = await getCache(key);

    if(thumbnail) {
        ctx.redirect(thumbnail);
    }

    let account;
    try {
        account = await Account.findByUsername(username);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account) {
        ctx.status = 404;
        return;
    }

    client.set(`${username}:thumbnail`, account.profile.thumbnail);

    ctx.redirect(account.profile.thumbnail);
};

