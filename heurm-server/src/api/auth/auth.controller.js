const Joi = require('joi');
const Account = require('models/Account');

// 로컬 회원가입
exports.localRegister = async (ctx) => {
    ctx.body = 'register';
};

// 로컬 로그인
exports.localLogin = async (ctx) => {
    ctx.body = 'login';
};

// 이메일 / 아이디 존재유무 확인
exports.exists = async (ctx) => {
    ctx.body = 'exists';
};

// 로그아웃
exports.logout = async (ctx) => {
    ctx.body = 'logout';
};