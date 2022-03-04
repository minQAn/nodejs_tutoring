import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'wirte/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');

const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST');


export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({ key, value }));

export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
    title,
    body,
    tags
}));

export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);
export const updatePost = createAction(UPDATE_POST, ({id, title, body, tags}) => ({
    id,
    title,
    body,
    tags
}));

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);


export function* writeSaga(){
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: null,
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
        }),
        [SET_ORIGINAL_POST]: (state, {payload: post}) => ({
            ...state,
            title: post.title,
            body: post.body,
            tags: post.tags,
            originalPostId: post._id
        }),
        [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,
        }),
        [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
            ...state,
            postError
        })
    },
    initialState
);

export default write;