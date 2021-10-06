'use strict';

const Post = require('../../models/post');

const mongoose = require('mongoose');
const Joi = require('joi'); // for validation?

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
// 원래는 여기서 validation을 해야함. title이나 body값을 체크함.
// 프론트에서 validation을 하더라도 백에서 해야하는 이유는 컴퓨터를 조금 아는 사람이 이 주소로 포스맨 같은걸로 어긋나는 정보를 보낼 수도 있기 때문에
exports.write = async (ctx) => {
  // validation 
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required()
  });

  const result = schema.validate(ctx.request.body);
  if(result.error){
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }


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
exports.list = async(ctx) => { //10은 소숫점없이 받는다는 뜻?
  const page = parseInt(ctx.query.page || '1', 10); // query는 컨텍스트에 있는거고 페이지는 내가만든것 // localhost:4000/api/posts?page=2
  // query.page가만약 값이없으면 non일텐데 그러면 에러가 뜰거라 1을 줬음

  if(page < 1){
    ctx.status = 400;
    return;
  }

  try{
    // 글을 최신순으로 보여줄때 
    const pageItemCount = 10;
    const posts = await Post.find() //find로찾은 어레는 몽구스 인스턴스를 가지고 있는 어레이라서 그안에있는 인스턴스들은 바로 변경을못해서 아래서 toJSON이라는 함수를 써서 바꿔서 쓸수있음
      .sort({_id: -1})  // sort(_id가 -1이면 내림차수, 1이면 오름차수)
      .limit(pageItemCount)    // 10개씩 보여주기
      .skip((page - 1) * pageItemCount) //스킵해서 보여주기
      .exec(); // find는 몽구스 함수 
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / pageItemCount)); //set은 header에다가 넣어주는것 //ceil은 올림 // 나누기10은 한페이지당 10개씩보여줄려고 //4.5면 마지막 페이지는 5개를 보여줘야해서 //이건 프론트쪽에서 마지막페이지를 알아야하기때문에 정보를 주기위해
    
    //다 받아온거를..
    ctx.body = posts
      .map(post => post.toJSON())  //find를 통해서 조회한 데이터는 mongoose에서 제공한 인스턴스라 toJSON으로 변환하고 필요한 부분을 바꿀수있다.
      .map(post => ({
        ...post,
        body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...` //글자가 200개가 넘으면 ... 으로 하기
      })); 
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
  //validation
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array()
      .items(Joi.string())     
  });
  
  const result = schema.validate(ctx.request.body);

  if(result.error){
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  // validation end----
  
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



