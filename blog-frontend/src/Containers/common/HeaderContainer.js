// 새로고침 해도 로그인 상태를 유지해 주기 위해

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
    const { user } = useSelector(({user}) => ({user: user.user})) //state.user
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    }

    return <Header user={user} onLogout={onLogout} />;
}

export default HeaderContainer;