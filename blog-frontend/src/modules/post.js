import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from "redux-saga/effects";

const UNLOAD_POST = 'post/UNLOAD_POST';
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createRequestActionTypes('post/READ_POST');

export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);


const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);

export function* postSaga(){
    yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
    post: null,
    error: null,
};

const post = handleActions(
    {
        [UNLOAD_POST]: state => initialState, //여기서 리턴하면 state값이 됨.
        [READ_POST]: (state, {payload: post}) => ({
            ...state,
            post: null,
            postError: null
        }),
        [READ_POST_SUCCESS]: (state, {payload: post}) => ({ 
            ...state,
            post,
        }),
        [READ_POST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error                
        }),   
    },
    initialState
);

export default post;