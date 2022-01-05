import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user'; //login check
import { useNavigate } from 'react-router-dom';

//실제적으로 데이터를 주고받고 하는 부분이기 때문에 component보다는 container가 맞음
const RegisterForm = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({ //auth, user에 이름을 다르게해야한다..?
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;

        if([username, password, passwordConfirm].includes('')){
            setError('No Empty!');
            return;
        }

        if(password !== passwordConfirm) {
            // Error
            setError('Password not same!');
            dispatch(changeField({ form: 'register', key: 'password', value: ''})); //초기화
            dispatch(changeField({form: 'register', key: 'passwordConfirm', value: ''}));
            return;
        }
        dispatch(register({username, password}));
    }

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // register success / failure
    useEffect(() => { //request날리고 서버에서 날라온 에러
        if(authError) {
            if(authError.response.status === 409){
                setError('same user name!');
                return;
            }
            setError('register fail!');            
            return;
        }
        if(auth) {
            console.log('Register Success!');
            console.log(auth);

            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    // user checking
    useEffect(() => {
        if(user){
            // console.log('check API success');
            // console.log(user);
            navigate('/');
            try{
                localStorage.setItem('user', JSON.stringify(user));   //새로고침을 해도 남아있음             
            } catch(e){
                console.log('localStorage is not working');
            }
        }
    }, [user, navigate]);


    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
            />
    );
}

export default RegisterForm;    // withRouter를 해줘야 History를 props로 담아옴.