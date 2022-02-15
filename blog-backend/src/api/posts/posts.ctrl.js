'use strict';

const Post = require('../../models/post');

const mongoose = require('mongoose');
const Joi = require('joi'); // for validation?
const sanitizeHtml = require('sanitize-html'); // html을 보여줄때 서버에서 먼저 작업을 해주고 보내줘야해서..? <script>같은거 걸러주기위해

const {ObjectId} = mongoose.Types;

// browser에서 p태그가 그대로 나오는데.. 그부분을 없애줌.., 에디터 lib를 사용했던부분.. 그리고 너무 길면 200자로 줄여서 리스트로 보내주는걸로?
const removeHtmlAndShorten = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],    
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`; // list에서는 구지 디테일을 다보여줄 필요가없고, 컨텐트 내용만 보여주면 되기때문에 줄여서 보내줌
}

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedArributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class']
  },
  allowedSchemas: ['data', 'http']
} //이것들만 허용을하고, 나머지는 에러를 리턴하나 그렇게됨.


// MiddleWare (for Validation)
// 11월4일 
exports.checkPostById = async(ctx, next) => {
  const {id} = ctx.params;

  if(!ObjectId.isValid(id)){  // 오브젝트아이디 타입인지 확인한것,몽구스 방식을 따라야해서.. 이거안하면 에러뜸
    ctx.status = 400; // bad request
    return;
  }

  try{
    const post = await Post.findById(id);   //이 아이디를 가지고있는 포스트가 있는지를 확인한것

    if(!post){
      ctx.status = 404; // not found
      return;
    }

    //Post가 존재할경우
    ctx.state.post = post;

    return next();
  } catch (e){
    ctx.throw(500, e);
  }

};

/* 
게시글 작성
POST /api/posts
{ title, body }
*/

// write는 내가 정하는 이름  like exports const write = ctx => {}
// 원래는 여기서 validation을 해야함. title이나 body값을 체크함.
// 프론트에서 validation을 하더라도 백에서 해야하는 이유는 컴퓨터를 조금 아는 사람이 이 주소로 포스맨 같은걸로 어긋나는 정보를 보낼 수도 있기 때문에
// 11월4일 이제 작성할때 유저 정보도 넣어야함.
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
    body: sanitizeHtml(body, sanitizeOption), //라이브러리 사용방법..
    tags,
    user: ctx.state.user
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
GET /api/posts?username=&tag=&page=
*/
//11월 4일, filtering 추가
exports.list = async(ctx) => { //10은 소숫점없이 받는다는 뜻? decimal 10진법
  const page = parseInt(ctx.query.page || '1', 10); // query는 컨텍스트에 있는거고 페이지는 내가만든것 // localhost:4000/api/posts?page=2
  // query.page가만약 값이없으면 non일텐데 그러면 에러가 뜰거라 1을 줬음

  if(page < 1){
    ctx.status = 400;
    return;
  }
  
  // 필터링해서 검색하기위해,  필터링에 조건이 안맞으면 아무것도 안뜸
  const {tag, username} = ctx.query;
  
  const query = { // ... 뜻은 앞에 있는건 가져온다.. 자바스크립트 오브젝트문법
    ...(username ? {'user.username': username} : {}), //없으면 아무것도없음
    ...(tag ? {tags: tag} : {})  // 스키마에있는 naming을 따랐음 
  }


  try{
    // 글을 최신순으로 보여줄때 
    const pageItemCount = 10;
    const posts = await Post.find(query) //find로찾은 어레는 몽구스 인스턴스를 가지고 있는 어레이라서 그안에있는 인스턴스들은 바로 변경을못해서 아래서 toJSON이라는 함수를 써서 바꿔서 쓸수있음
      .sort({_id: -1})  // sort(_id가 -1이면 내림차수, 1이면 오름차수)
      .limit(pageItemCount)    // 10개씩 보여주기
      .skip((page - 1) * pageItemCount) //스킵해서 보여주기
      .exec(); // find는 몽구스 함수 
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / pageItemCount)); //set은 header에다가 넣어주는것 //ceil은 올림 // 나누기10은 한페이지당 10개씩보여줄려고 //4.5면 마지막 페이지는 5개를 보여줘야해서 //이건 프론트쪽에서 마지막페이지를 알아야하기때문에 정보를 주기위해
    
    //다 받아온거를..
    ctx.body = posts
      .map(post => post.toJSON())  //find를 통해서 조회한 데이터는 mongoose에서 제공한 인스턴스라 toJSON으로 변환하고 필요한 부분을 바꿀수있다.
      .map(post => ({
        ...post,
        body: removeHtmlAndShorten(post.body) //함수로 따로 만들었음
        // post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...` //글자가 200개가 넘으면 ... 으로 하기
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
  //여긴 미들웨어를 통해서 왔기때문에 포스트 존재를 알고 있음. 그래서 여기선 검증을 안해도 됨.
  ctx.body = ctx.state.post;
  
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
  const nextData = { ...ctx.request.body};
  if(nextData.body){
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption); 
  }
  try{
    const post = await Post.findByIdAndUpdate(id, nextData, {new: true}).exec(); // id, request.body(바꿀내용), new:true를하면 업데이트된 값을 리턴해준다. false일때는 업데이트 되기전의 데이터를 리턴해준다.
    
    if(!post){
      ctx.status = 404;
      return;
    }

    ctx.body = post;
  } catch(e){
    ctx.throw(500, e);
  }
};









// 11월4일 
// middleware로 쓰일꺼고 자기가 쓴 글인지 확인하려고
// 이컨트롤러에서 쓰면 좋은건.. user, post가져다 쓸수 있어서? 그리고 미들웨어를 거쳐와서 검증됬기때문에
exports.checkOwnPost = (ctx, next) => {
  const{ user, post } = ctx.state;

  if(post.user._id.toString() !== user._id){
    ctx.status = 403; // 다른 유저가 수정이나 삭제를 하면 -> Forbidden 
    return;
  }

  return next();
}
