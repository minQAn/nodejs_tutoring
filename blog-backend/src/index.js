// command + shit + p  => format document 하면 내가 설정한 코드스타일로 변경됨.
// setting -> save
// const hello = 'hello';

// Database
require('dotenv').config(); // 환경변수

const Koa = require('koa'); // == import  node back end 만드는 프레임워크
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose'); //Database

const api = require('./api');
const app = new Koa();
const router = new Router();
const { PORT, MONGO_URI } = process.env; // 환경변수 가져옴

router.use('/api', api.routes());

// Database Connect
mongoose
.connect(MONGO_URI, {useNewUrlParser: true})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(e => {
  console.error(e); //색깔이 다를뿐..?
});

// 아래줄 라우터 적용하기전에 파싱을 해야함.
app.use(bodyParser());
// 라우터쓰겠다는 거고 보통 코아쓸때 이렇게 쓴다고함. 그냥 외우기
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000; //연결이 안될시 4000
app.listen(port, () => {
  console.log('Listening to port %d', port);
});



// 숙제: Koa 공부하거나 게츠비 공부하거나 newsAPI
// newsAPI를 더 만져서 게츠비 템플릿 맘에드는거 하나를 골라서
// netlify서비스에 올리는거까지 (cors해결도 해봐야함)
// cart부분만 레이지 통해서

// API ui 짜는법..?
// POST /posts
// GET /posts
// GET /posts/:id
// DELETE /posts:/:id

// 어떤게시글의 댓글을 가지고오고싶다면
// GET /posts/:id/comments

// GET POST PUT DELETE PATCH
// PUT은 통째로 갈아끼울 때
// PATCH는 한개 row에 대한 주소만 바꾸거나 이름만 바꾸거나 할떄 쓰는것.

// 숙제
// 몽고디비랑 몽구스 mongoose
// 몽구스가 몽고디비를 쓸때 쓰는 라이브러리임.
