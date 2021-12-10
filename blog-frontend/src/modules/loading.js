// redux saga.. 비동기 할때 사용할때..?
import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
    START_LOADING, //action type
    requestType => requestType  // payload로 던져준거를 그대로 리턴해준것
);

export const finishLoading = createAction(
    FINISH_LOADING,
    requestType => requestType
);


const initialState = {};

const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true //requestType에 payload로넘겨준 값...ex
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false //requestType에 payload로넘겨준 값...ex
        })
    },
    
    initialState,
)

export default loading;