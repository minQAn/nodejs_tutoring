import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user'; //login check

//실제적으로 데이터를 주고받고 하는 부분이기 때문에 component보다는 container가 맞음
const RegisterForm = () => {
    const dispatch = useDispatch();
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
        if(password !== passwordConfirm) {
            // Error
            return;
        }
        dispatch(register({username, password}));
    }

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // register success / failure
    useEffect(() => {
        if(authError) {
            console.log('Error');
            console.log(authError);
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
            console.log('check API success');
            console.log(user);
        }
    }, [user]);


    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            />
    );
}

export default RegisterForm;