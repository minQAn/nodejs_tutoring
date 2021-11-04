//posts에 관한 라우터

const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
const posts = new Router();
//11월4일
const checkLoggedIn = require('../../lib/checkLoggedIn'); //로그인한 사람만 작성할수 있게 하기위해 체크하려고

// const printInfo = ctx => {
//     ctx.body = {
//         method: ctx.method,
//         path: ctx.path,
//         params: ctx.param
//     }
// }


posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);



// sep 7 refactoring
const post = new Router(); //라우터를 새로만들고.. 여기부터는 

post.get('/', postsCtrl.read); //중간에들어간건 미들웨어로 사용     //로그아웃 상태여도 검색은 누구나 할수있어야하기 때문에 여기는 checkLoggedIn안함
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove); //로그인체크, 자기글인지 체크
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);
// posts.put('/:id', postsCtrl.replace);

posts.use('/:id', postsCtrl.checkPostById, post.routes());  //아이디가 있는 경우에만 미들웨어를 적용해서 id체크할경우에만 서브 routes로 했음


module.exports = posts;