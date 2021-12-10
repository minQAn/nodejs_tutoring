import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';

// store
const rootReducer = combineReducers({
    auth,
    loading
});


// 미들웨어에로 해서 추가해줄..? 비동기처리를 해줄 부분 미들웨어로
export function* rootSaga(){
    yield all([authSaga()]);
}

export default rootReducer;
