import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';


export const changeField = createAction(CHANGE_FIELD, 
    ({form, key, value}) => ({
        form,   //register or login
        key,    // username, password, passwordConfirm
        value   // 
    })); //createAction쓰면서 타입을 던져주면..

export const initializeForm = createAction(INITIALIZE_FORM,
    form => form);

const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    }
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
            [form]: initialState[form],                        
        })
    },
    initialState  // 2번째 파라미터로 초기값
)

export default auth;