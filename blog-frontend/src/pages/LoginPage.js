import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../Containers/auth.js/LoginForm';

const LoginPage = () => {
    return (
        <AuthTemplate>
            <LoginForm />
        </AuthTemplate>
    );
}

export default LoginPage;