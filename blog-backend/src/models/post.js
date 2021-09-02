/*
모델 데이터 형식 설정

title: String
body: String
tags: [String]
publishedDate: Date
*/

const mongoose = require('mongoose');

const {Schema} = mongoose;

const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    subTitle: String,
    publishedDate: {
        type: Date,
        default: Date.now  //여긴타입들만 저장하는거라 () 함수형으로 실행안하고 해야함.
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;