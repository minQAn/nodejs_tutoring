// 로그인이나 레지스터를 한후에 리덕스에 저장을하고, 로그인여부를 확인할때 리덕스 스토어에 유저정보가 들어가있으면
// 로그인한 상태구나를 프론트에서 알 수 있음

import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';
import { call, takeLatest } from 'redux-saga/effects';


const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침 후에 임시로그인 처리

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK'); 
const LOGOUT = 'user/LOGOUT'; // logout에는 따로 success, failure구지 필요없을듯.

export const tempSetUser = createAction(TEMP_SET_USER, user => user); //액션, payload로 날라오는걸 어떻게 할지 세팅
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);


const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga(){
    try{
        localStorage.removeItem('user');        
    }catch(e){
        console.log('localStorage is not working');
    }
}

function* logoutSaga(){
    try{
        yield call(authAPI.logout);
        localStorage.removeItem('user');        
    }catch(e){
        console.log(e);
    }
}

export function* userSaga(){
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga); //로그인이 끝났는데 아직 브라우저를 안꺼서 프론트에서 상태를 모르는경우..?
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
    user: null,
    checkError: null,
}

// redux action이라는 lib에서 reducer를 편핳게 쓰게 해주는것..
// 서버로 보내고 response로 돌아온값을 세팅하는부분
export default handleActions({ //reducer
    [TEMP_SET_USER]: (state, { payload: user }) => ({
        ...state,
        user,        
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({ //success, failure 이름은 라이브러리가 인지해서 꼭 이름을 같이해야함..
        ...state,
        user,
        checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
        ...state,
        user: null,
        checkError: error,
    }),
    [LOGOUT]: state => ({
        ...state,
        user: null
    })
}, initialState);