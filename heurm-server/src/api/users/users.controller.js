const Account = require('models/account');

exports.getProfile = async (ctx) => {
    const { username } = ctx.params;

    // 계정 찾기
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

    // 프로필과 생각 수 응답
    ctx.body = {
        profile: account.profile,
        thoughtCount: account.thoughtCount
    };
};


exports.getThumbnail = async (ctx) => {
    const { username } = ctx.params;

    // 계정 찾기
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

    // 썸네일 주소로 리다이렉트
    ctx.redirect(account.profile.thumbnail);
};