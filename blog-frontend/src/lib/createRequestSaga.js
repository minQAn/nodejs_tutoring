import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

//refactoring [login, register]
export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
}


// 로딩 액션을 호출했을때 그 타입에 따른 공용적인 모든것들을 처리하려고..?
export default function createRequestSaga(type, request){
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    
    // thunk vs redux-saga 둘이 같은 역할을 함.
    return function * (action){  //action 객체, 타입과 페이로드가 들어있는.. // * 는 redux-saga를 쓸때 쓰는 법 // * 은 generator 함수라고 함.
        yield put(startLoading(type)); //put은 dispatch같은거라고 생각.. 

        try{
            const response = yield call(request, action.payload); // call은 그결과가 resolve가 될때까지 멈춰있음. await같이.. //createAction으로 보내면 .payload로 자동으로 보냄.
            yield put({
                type: SUCCESS, //action 같이..
                payload: response.data,              
            });
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }

        yield put(finishLoading(type));
    }
}


// redux-saga
// * generatorFunction이란
/*
    const ge = function * generatorFunction(){
        console.log('안녕하세요?');
        yield 1;
        console.log('제너레이터 함수');
        yield 2;
        console.log('function'*);
        yield 3;

        return 4;
    }

    ge.next()하면 다음거가 계속 실행됨.

    // example.. 약간 리듀서같음
    function * watchGenerator(){
        console.log('모니터링 시작');
        while(true){
            const action = yield;
            if(action.type === 'HELLO'){
                console.log('안녕하세요?');
            }
            if(action.type === 'BYE'){
                console.log('안녕히가세요');
            }
        }
    }
*/

//while문이 받지않더라도 다른작업을 계속하면서 yield는 대기를 하면서 값을 받아왔을때 실행함.