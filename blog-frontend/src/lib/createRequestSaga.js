import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestSaga(type, request){
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}FAILURE`;
    
    return function * (action){  // * 는 redux-saga를 쓸때 쓰는 법
        yield put(startLoading(type));

        try{
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
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