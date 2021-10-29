const jwt = require('jsonwebtoken');

const jwtMiddleware = (ctx, next) => {
    const token = ctx.cookies.get('access_token');
    console.log('middle');
    if(!token) {
        console.log('middle');
        return next();
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //result => 서버에서 담았던 정보.. 오브젝트를 리턴..?
        console.log(decoded);

        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username
        };

        return next();
    } catch (e){
        return next();
    } 
};

module.exports = jwtMiddleware;