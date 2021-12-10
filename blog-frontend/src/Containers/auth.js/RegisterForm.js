import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeForm, changeField, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';


//실제적으로 데이터를 주고받고 하는 부분이기 때문에 component보다는 container가 맞음
const RegisterForm = () => {
    const dispatch = useDispatch();

    // mapStatetoProps 대신 쓰는게 이거. 
    const { form, auth, authError } = useSelector(({auth}) => ({  //state //리덕스 스토어안에있는..? auth, 각 키들을 가져올때
        form: auth.register,        //state.auth.login
        auth: auth.register,
        authError: auth.authError
    }));

    const onChange = e =>{
        const { value, name } = e.target;
        dispatch(
            changeField({   //우리가 만든 액션네임..
                form: 'register',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if(password !== passwordConfirm){
            // Error
            return;
        }

        dispatch(register({username, password}));
    }

    useEffect(() => {
        dispatch(initializeForm('register'));        
    }, [dispatch]);


    // register success or failure
    useEffect(() => {
        if(authError){
            console.log('Error');
            console.log(authError);
            return;
        }

        if(auth){
            console.log('Register Success!');
            console.log(auth);
        }
    }, [auth, authError])

    
    

    return  (
        <AuthForm 
            type="register" 
            form={form} 
            onChange={onChange} 
            onSubmit={onSubmit} 
            />

    );
}


export default RegisterForm;
