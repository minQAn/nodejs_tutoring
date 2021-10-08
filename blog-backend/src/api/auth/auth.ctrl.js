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
        .alphanum() //스트링과 숫자만 받고 3~20글자로 꼭적어야함. (특수문자안된다는 뜻)
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
        await user.save();

        const data = user.toJSON();
        delete data.hashedPassword; // 비밀번호를 같이 전송하면 위험하니까

        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAage: 1000 * 60 * 60 * 24 * 7,    //밀리세컨이라1000 곱한거고 60초 60분 24시간 7일
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
    const {username, password} = ctx.request.body;
    if(!username || !password){
        ctx.status = 401 //Unathroized
        return;
    }

    try{
        const user = await User.findByUsername(username);
        if(!user){  //아이디가 없을경우
            ctx.status = 401; 
            return;
        }

        const valid = await user.checkPassword(password);
        if(!valid){
            ctx.status = 401;
            return;
        }

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAage: 1000 * 60 * 60 * 24 * 7,    //밀리세컨이라1000 곱한거고 60초 60분 24시간 7일
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

exports.check = async(ctx) => {
    
};

exports.logout = async(ctx) => {
    
};