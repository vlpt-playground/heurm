const Account = require('models/account');

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


exports.getThumbnail = async (ctx) => {
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
    ctx.set('Cache-Control', 'max-age=604800');
    ctx.redirect(account.profile.thumbnail);
};

