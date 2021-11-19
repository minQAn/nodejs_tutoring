import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const AuthFormBlock = styled.div`
    h3{
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;      // 클릭하면 주변에 테두리 파래지는거 없애는거임
    width: 100%;
    &:focus{
        color: ${palette.teal[0]}
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {  // 처음꺼빼고 뒤에 인접한것들 적용됨
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a{  // Link
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

const ButtonWithMarginTop = styled(Button)` // Button은 상속...! 컴포넌트를 상속..
    margin-top: 1rem;
`;

const textMap = {
    login: 'LOGIN',
    register: 'REGISTER'
}


const AuthForm = ({ type }) => {
    const text = textMap[type];

    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form>
                <StyledInput autoComplete="username" name="username" placeholder="ID" />  {/* autoComplete는 이전기록 나열 */}
                <StyledInput autoComplete="new-password" name="password" placeholder="PASSWORD" type="password" />
                {
                    type === 'register' && (
                        <StyledInput autoComplete="new-password" name="paasswordConfirm" placeholder="PASSWORD CONFIRM" type="password" />
                    )
                }
                
                <ButtonWithMarginTop cyan fullWidth>{text}</ButtonWithMarginTop>
            </form>
            <Footer>
                {
                    type === 'login' ? (
                        <Link to="/register">REGISTER</Link>
                    ) : (
                        <Link to="/login">LOGIN</Link>
                    )
                }
            </Footer>
        </AuthFormBlock>
    );
}

export default AuthForm;