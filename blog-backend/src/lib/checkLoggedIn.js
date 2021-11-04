const checkLoggedIn = (ctx, next) => {
    if(!ctx.state.user){        // 유저가 없을경우.. 이거생성은 jwtMiddleware에서 수시로 함
        ctx.status = 401;
        return;
    }
    
    return next();
}

module.exports = checkLoggedIn;