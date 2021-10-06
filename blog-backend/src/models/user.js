const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
// yarn add jsonwebtoken 
const jwt = require('jsonwebtoken'); 


const UserSchema = new Schema({
    username: String,
    hashedPassword: String,      // 보안상 위험하기때문에 그냥 안넣음
});

UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10); // 암호화할때..? 10을가지고 앞에받은 패스워드를 암호화를 해준다고함..
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.hashedPassword); //문자열로제공이되는데.. 2번째 파라미터는 해쉬드된 비밀번호..?
    return result;
};

UserSchema.statics.findByUsername = function(username){
    return this.findOne({username});  // 여기서 말하는 this는 model User를 가르킴..? User로 불러서 쓰게할꺼라 this..
}

UserSchema.methods.serialize = function(){
    const data =this.toJSON();
    delete data.hashedPassword;
    return data;
}

//Token 만들기
UserSchema.methods.generateToken = function(){
    const token = jwt.sign( //1. 첫번째 파라미터로는 토큰안에 집어넣어주고 싶은 정보
        {
            _id: this.id,
            username: this.username
        },
        process.env.JWT_SECRET,  //2. 토큰을 암호할떄쓸 랜덤문자열? 
        {
            expiresIn: '7d'   // 3. 유효기간  일주일
        }
    );
    return token;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;


// need to add bcrypt
// yarn add bcrypt --save