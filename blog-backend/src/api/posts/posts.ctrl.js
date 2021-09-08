'use strict';

const Post = require('../../models/post');

const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

// MiddleWare (for Validation)
exports.checkObjectId = (ctx, next) => {
  const {id} = ctx.params;
  if(!ObjectId.isValid(id)){
    ctx.status = 400; // bad request
    return;
  }
  return next();
};

/* 
게시글 작성
POST /api/posts
{ title, body }
*/

// write는 내가 정하는 이름  like exports const write = ctx => {}
exports.write = async (ctx) => {
  const {title, body, tags} = ctx.request.body;

  // model을 만듬
  const post = new Post({
    title,
    body,
    tags,
  }); 

  try{
    await post.save();
    ctx.body = post;
  } catch(e){
    ctx.throw(500, e);
  }
};

/*
게시글 목록 조회
GET /api/posts
*/
exports.list = async(ctx) => {
  try{
    const posts = await Post.find().exec(); //find는 몽구스 함수 
    ctx.body = posts;
  } catch(e){
    ctx.throw(500, e);
  }
};

/*
특정 게시글 조회
GET /api/posts/:id
*/
exports.read = async(ctx) => {
  const {id} = ctx.params;
  try{
    const post = await Post.findById(id).exec();

    if(!post){
      ctx.status = 404;
      ctx.body = {
        message: "Not Found"
      };
      return;
    }

    ctx.body = post;
  } catch(e){
    ctx.throw(500, e);
  }

};

/*
특정 게시글 삭제
DELETE /api/posts/:id
*/

exports.remove = async(ctx) => {
  const {id} = ctx.params;
  try{
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;  
  } catch(e){
    ctx.throw(500, e);
  }
};

/*
게시글 수정
PUT /api/posts/:id
{ title, body }
*/




/*
게시글 수정 특정 필드
PATCH /api/posts/:id
{title or body}
*/
exports.update = async (ctx) => {
  const { id } = ctx.params;
  try{
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {new: true}).exec(); // id, request.body(바꿀내용), new:true를하면 업데이트된 값을 리턴해준다. false일때는 업데이트 되기전의 데이터를 리턴해준다.
    
    if(!post){
      ctx.status = 404;
      return;
    }

    ctx.body = post;
  } catch(e){
    ctx.throw(500, e);
  }
};



