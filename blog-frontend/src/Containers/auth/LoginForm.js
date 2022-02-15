import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeForm, changeField , login} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { check } from '../../modules/user';


//실제적으로 데이터를 주고받고 하는 부분이기 때문에 component보다는 container가 맞음
const LoginForm = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({  //state //리덕스 스토어안에있는..? auth 
        form: auth.login,        //state.auth.login
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e =>{
        const { value, name } = e.target;
        dispatch(
            changeField({   //우리가 만든 액션네임..
                form: 'login',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({username, password}));
    }

    useEffect(() => {
        dispatch(initializeForm('login'));        
    }, [dispatch]);

    useEffect(() => {
        if(authError){
            console.log('Error');
            console.log(authError);
            setError('Login Failure!');
            return;
        }
        if(auth){
            console.log('success');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    //로그인에 성공했을때 로컬에 user를 저장하고 (저장하는 이유는 새로고침 했을때 데이터 날라갔을때 로컬에서 다시 불러오기 위해서)
    useEffect(() => {
        if(user){
            navigate('/');
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch(e){
                console.log('localStorage is not working');
            }
        }
    }, [navigate, user]);

    return  (
        <AuthForm 
            type="login" 
            form={form} 
            onChange={onChange} 
            onSubmit={onSubmit}
            error={error}
            />

    );
}


export default LoginForm;
