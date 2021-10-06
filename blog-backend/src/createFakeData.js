// for pagination on sep 7
// 데이터 강제로 40개 그냥 간단하게 insert해주는 방법

const Post = require('./models/post');

module.exports = function createFakeData(){
    const posts = [...Array(40).keys()].map(i => ({
        title: `Post #${i}`,
        body: "Loremad sdf sdf sdf sdf sdf sdf sdsdf sdf sdf sdf sdf sdfdfxcvwe ㄴㅇㄹ ㄴㅇㄹ ㄴㄴㅇㄹㄴㅇㄹㄴㅇㄹ ㄴㅇㄹ ㄴㅇㄹ ㄴㅇㄹㄴㅇㄹ ㄴㄹ ㄴㅇㄹ ㄴㅇ ㄹㄴㅇㄹ ㄴㅇ ㄹㄴㅇㄹ ㄴㅇㄹ ㄴㅇㄹsdfsdf sdfsdfsdfsdf sdfsfdsfsd df sdf sdf sdf sdsdf sdf sdf sdf sdf sdfdfxcvwe ㄴㅇㄹ ㄴㅇㄹ ㄴdf sdf sdf sdf sdsdf sdf sdf sdf sdf sdfdfxcvwe ㄴㅇㄹ ㄴㅇㄹ ㄴdf sdf sdf sdf sdsdf sdf sdf sdf sdf sdfdfxcvwe ㄴㅇㄹ ㄴㅇㄹ ㄴdf sdf sdf sdf sdsdf sdf sdf sdf sdf sdfdfxcvwe ㄴㅇㄹ ㄴㅇㄹ ㄴdf sdf sdf sdf sdsdf sdf sdf sdf sdf sdfdfxcvwe ㄴㅇㄹ ㄴㅇㄹ ㄴdf sdf sdf sdf sdsdf sdf sdf sdf sdf sdfdfxcvwe ㄴㅇㄹ ㄴㅇㄹ ㄴ",
        tags: ['Fake', 'Data']
    }));

    Post.insertMany(posts, (err, docs) => {
        console.log(docs);
    });
};

