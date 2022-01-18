// 레지스터랑 로그인 form을 다루는 부분

import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth'; //export된것들을 가져오려면 {login, ...}해야하는데 이렇게하면 authAPI.login으로 가능


const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';


// refactoring
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER'); // auth/REGISTER_SUCCESS

// 밑에는 안좋은 방법이고 위에는 리팩토링 된 코드.. 이게 엄청 많다진다고 생각해보면 위에꺼가 훨씬 나음.
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';


export const changeField = createAction(CHANGE_FIELD, 
    ({form, key, value}) => ({
        form,   //register or login
        key,    // username, password, passwordConfirm
        value   // 
    })); //createAction쓰면서 타입을 던져주면..

// dispatch해서 보내는부분분..?
export const register = createAction(REGISTER, ({ username, password }) => ({ // payload.. username: payload.username,  디스트럭쳐해서 가져온것임
    username,
    password,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({ // payload.. username: payload.username,  디스트럭쳐해서 가져온것임
    username,
    password,
}));




// Create Saga
const registerSaga = createRequestSaga(REGISTER, authAPI.register); //type, payload
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function * authSaga(){
    yield takeLatest(REGISTER, registerSaga); // 연결해주는 부분..?가장 마지막으로 dispatch된 함수만 처리하겠다. (여러번 요청이 들어왔을경우..?)
    yield takeLatest(LOGIN, loginSaga);    // 여러개가 실행되면 이전건 취소되고 최근거가 실행이 됨.
};

export const initializeForm = createAction(INITIALIZE_FORM,
    form => form); //'login' or 'register'

const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};

const auth = handleActions( //reducer 할때 타입받아와서 switch안에서 state변경하고 했던 그런작업을 좀더 깔끔하게 해주는 함수
    {
        // onChange...
        
        // [CHANGE_FIELD]: (state, action) => state, // return state 
        [CHANGE_FIELD]: (state, {payload: {form, key, value}}) => //payload라고 날라옴 라이브러리에서
            produce(state, draft => {   // immer 라이브러리 사용했음. draft라는걸 받아옴.. 전체 state를 말함..?
                draft[form][key] = value;   // draft는 return안해도 알아서 바꿔줌
        }),
        [INITIALIZE_FORM]: (state, {payload: form}) => ({
            ...state,
            [form]: initialState[form], // login: {username, password} or register:{}
            authError: null                        
        }),
        [REGISTER_SUCCESS]: (state, {payload: auth}) => ({ //reducer..
            ...state,
            authError: null,
            auth                        
        }),
        [REGISTER_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,                           
        }),
        [LOGIN_SUCCESS]: (state, {payload: auth}) => ({ // auth is username..
            ...state,
            authError: null,
            auth                        
        }),
        [LOGIN_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,                           
        })
    },
    initialState  // 2번째 파라미터로 초기값
)

export default auth;