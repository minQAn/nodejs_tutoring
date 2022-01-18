import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'wirte/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({ key, value }));

export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
    title,
    body,
    tags
}));


const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);

export function* writeSaga(){
    yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState, //여기서 리턴하면 state값이 됨.
        [CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            [key]: value
        }),
        [WRITE_POST]: state => ({ //초기화, 다른곳에있다가 오면 있을 수 있어서
            ...state,
            post: null,
            postError: null
        }),
        [WRITE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post    
            //위에서 액션이오면 이미 postError:null이라 구지 안해줘도됨
        }),
        [WRITE_POST_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            postError
        })
    },
    initialState
);

export default write;