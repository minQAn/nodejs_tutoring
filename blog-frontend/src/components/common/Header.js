import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.88);
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .log{
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right{
        display: flex;
        align-items: center;
    }
`;

//위에 nav bar가 있다고 가정하고 그만큼 띄워줄려고
const Spacer = styled.div`
    height: 4rem;
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;    
`;


// container는 state를 관리하기위해서
const Header = ({user, onLogout}) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className="logo">DEV!!!</Link>
                    {user ? (
                        <div className='right'>
                            <UserInfo>{user.username}</UserInfo>
                            <Button onClick={onLogout}>Logout</Button>
                        </div>
                    ) : (
                        <div className="right">
                            <Button to="/login">Login</Button>
                        </div>)}
                </Wrapper>
            </HeaderBlock>
            <Spacer />  
        </>
    );
}

export default Header;