//posts에 관한 라우터

const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
const posts = new Router();

// const printInfo = ctx => {
//     ctx.body = {
//         method: ctx.method,
//         path: ctx.path,
//         params: ctx.param
//     }
// }


posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);



// sep 7 refactoring
const post = new Router(); //라우터를 새로만들고.. 여기부터는 

post.get('/', postsCtrl.read); //중간에들어간건 미들웨어로 사용
post.delete('/', postsCtrl.remove);
post.patch('/', postsCtrl.update);
// posts.put('/:id', postsCtrl.replace);

posts.use('/:id', postsCtrl.checkObjectId, post.routes());  //아이디가 있는 경우에만 미들웨어를 적용해서 id체크할경우에만 서브 routes로 했음


module.exports = posts;