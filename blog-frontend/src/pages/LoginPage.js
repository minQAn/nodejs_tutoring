import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../Containers/auth.js/LoginForm';

const LoginPage = () => {
    return (
        <AuthTemplate>
            {/* <AuthForm type="login" /> */}
            <LoginForm />
        </AuthTemplate>
    );
}

export default LoginPage;