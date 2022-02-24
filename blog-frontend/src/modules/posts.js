import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from "redux-saga/effects";

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] = createRequestActionTypes('posts/LIST_POSTS');

export const listPosts = createAction(LIST_POSTS, ({tag, username, page}) => ({  
    tag,
    username,
    page
}));


const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);

export function* postsSaga(){
    yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
    posts: null,
    error: null,
    lastPage: 1
};

const posts = handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, {payload: posts, meta: response}) => ({  //meta는 configuration같은 data들
            ...state,
            posts,
            lastPage: parseInt(response.headers['last-page'], 10) // 10의 의미는 뒤에 날라오는 값의 소숫점을 없앰. 마지막페이지를 저장 //last-page는 소문자여야 하나봄..?대문자하니 에러..
        }),
        [LIST_POSTS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error                
        }),   
    },
    initialState
);

export default posts;