import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga }from './user';
import write, { writeSaga } from './write';


// store
const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
});

// 미들웨어에로 해서 추가해줄..? 비동기처리를 해줄 부분 미들웨어로
export function* rootSaga(){
    yield all([authSaga(), userSaga(), writeSaga()]); // 함수 () 를 실행해서 대기상태로 
}

export default rootReducer;
