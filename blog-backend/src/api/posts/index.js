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

posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read); //중간에들어간건 미들웨어로 사용
posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove);
// posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update);


module.exports = posts;