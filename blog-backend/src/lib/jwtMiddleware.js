const jwt = require('jsonwebtoken'); // 토큰 존재 확인하려고?
const User = require('../models/user');


const jwtMiddleware = async (ctx, next) => {
    const token = ctx.cookies.get('access_token');

    if(!token) {        
        return next();
    }

    try{                                    //토큰 비밀번호
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //result => 서버에서 담았던 정보.. 오브젝트를 리턴..?
        console.log(decoded); //token 정보..  _id: user ObjectId, name, iat: 토큰만든날?, exp: expirtation time
        
        // 여기서 user를 생성
        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username
        };

        // 어떤 요청을 할때마다 미들웨어에서 체크를 하고 해당 토큰이 유효기간이 3.5일 이하면 계속 갱신을한다.
        // expired date 3.5 미만으로 남았을때 토큰을 다시 7일로 갱신하기
        const now = Math.floor(Date.now() / 1000); // 밀리세컨드라서 천으로 나눔
        if(decoded.exp - now < 60 * 60 * 24 * 3.5){ // exp는 생성할때 언제까지 유요한지 자동으로 생김  60초 * 60분 * 24시간 * 3.5일 
            const user = await User.findById(decoded._id); //decoded = result
            const token = user.generateToken();
            ctx.cookies.set('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true
            });
        }

        return next();
    } catch (e){
        return next();
    } 
};

module.exports = jwtMiddleware;