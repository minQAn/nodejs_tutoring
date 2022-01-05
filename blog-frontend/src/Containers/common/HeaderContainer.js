// 새로고침 해도 로그인 상태를 유지해 주기 위해

import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
    const { user } = useSelector(({user}) => ({user: user.user})) //state.user
    return <Header user={user} />;
}

export default HeaderContainer;