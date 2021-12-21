import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeForm, changeField } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';


//실제적으로 데이터를 주고받고 하는 부분이기 때문에 component보다는 container가 맞음
const LoginForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({auth}) => ({  //state //리덕스 스토어안에있는..? auth 
        form: auth.login        //state.auth.login
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
    }

    useEffect(() => {
        dispatch(initializeForm('login'));        
    }, [dispatch]);

    return  (
        <AuthForm 
            type="login" 
            form={form} 
            onChange={onChange} 
            onSubmit={onSubmit} 
            />

    );
}


export default LoginForm;
