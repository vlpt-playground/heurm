const mongoose = require('mongoose');
const { Schema } = mongoose;

// Book 에서 사용할 서브다큐먼트의 스키마입니다.
const Author = new Schema({
    name: String,
    email: String
});

const Book = new Schema({
    title: String,
    authors: [Author], // 위에서 만든 Author 스키마를 가진 객체들의 배열형태로 설정했습니다.
    publishedDate: Date,
    price: Number,
    tags: [String],
    createdAt: { // 기본값을 설정할땐 이렇게 객체로 설정해줍니다
        type: Date,
        default: Date.now // 기본값은 현재 날짜로 지정합니다.
    }
});

// 스키마를 모델로 변환하여, 내보내기 합니다.
module.exports = mongoose.model('Book', Book);