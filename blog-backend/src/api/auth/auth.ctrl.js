const Joi = require('joi');
const User = require('../../models/user');

/*
    POST /api/auth/register
    {
        username: 'david',
        password: 'mypass123'
    }
*/
exports.register = async(ctx) => {
    const schema = Joi.object().keys({
        username: Joi.string()
        .alphanum() //스트링과 숫자만 받고 3~20글자로 꼭적어야함. (특수문자안된다는 뜻) //<>태그같은건 걸러서 <Script>같은거 걸름
        .min(3)     
        .max(20)
        .required(),
        password: Joi.string().required()
    });

    const result = schema.validate(ctx.request.body);

    if(result.error){
        ctx.status = 400,
        ctx.body = result.error;
        return;
    }

    const {username, password} = ctx.request.body;
    try{
        const exists = await User.findByUsername(username);
        if(exists){
            ctx.status = 409;  // conflict status
            return;
        }

        //인스턴스..
        const user = new User({
            username
        });

        //password..
        await user.setPassword(password); // 패스워드는 여기에서
        await user.save(); // data베이스에 유저등록이됨

        // const data = user.toJSON(); // response할때 비밀번를 지우고 보내려고
        // delete data.hashedPassword; // 비밀번호를 같이 전송하면 위험하니까

        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,    //밀리세컨이라1000 곱한거고 60초 60분 24시간 7일
            httpOnly: true // 자바스크립트를 통해서 쿠키안의 내용을 조회할수 없게함 (보안때문에)
        });
    } catch(e){
        ctx.throw(500, e);
    }
};

/*
    POST /api/auth/login
    {
        username: 'kik21',
        password: 'test123
    }
*/
exports.login = async(ctx) => {
    console.log('test');
    const {username, password} = ctx.request.body;
    if(!username || !password){
        ctx.status = 401; //Unathroized
        console.log('1');
        return;
    }

    try{
        const user = await User.findByUsername(username);
        if(!user){  //아이디가 없을경우
            ctx.status = 401; 
            console.log('2');
            return;
        }

        const valid = await user.checkPassword(password);
        if(!valid){
            ctx.status = 401;
            console.log('3');
            return;
        }

        ctx.body = user.serialize(); //mongo db -> json 
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,    //밀리세컨이라1000 곱한거고 60초 60분 24시간 7일
            httpOnly: true // 자바스크립트를 통해서 쿠키안의 내용을 조회할수 없게함 (보안때문에)
        });
    } catch(e){
        ctx.throw(500, e);
    }
};

// yarn add jsonwebtoken 
// openssl rand -hex 64

// 10월 5일 todo
// 로그인이 안되고 not found 뜨는 문제 해결하기
// 10월 28일
// 토큰은 유요한지기억하기위해


// 개발자가 체크하려고 만듬 + middleware에서 사용하려고
exports.check = async(ctx) => {
    const { user } = ctx.state; //middleware 에서 생성됬음

    if(!user){
        //No login
        ctx.status = 401;   // no page
        return;
    }
    
    ctx.body = user;
};

//11월4일  토큰 재발급 in jwtMiddleware에서 했음.  3.5일 이하면 자동으로 되게

// 숙제 10월28일  <-- 로그아웃하고, 연장하는거 찾아공부, 토큰개념 복습
exports.logout = async(ctx) => {
    ctx.cookies.set('access_token');    //토큰 이름만 넣고 그안에 값은 없애야함.
    ctx.status = 204;   // no content
};