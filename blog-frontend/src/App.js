import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
    <Helmet> {/* 페이지 상단 타이틀 바꿀수있음 */}
      <title>Dev!!</title>
    </Helmet>
    <Routes>        
      <Route element={<PostListPage />} path="/" exact /> {/* @ 는 값으로받아옴..? : 만해도되는데 읽기좋게하려고, 홈은 / 임*/}
      <Route element={<PostListPage />} path="/@:username" exact /> {/* @ 는 값으로받아옴..? : 만해도되는데 읽기좋게하려고, 홈은 / 임*/}
      <Route element={<LoginPage/>} path="/login" />
      <Route element={<RegisterPage/>} path="/register" />
      <Route element={<WritePage/>} path="/write" />
      <Route element={<PostPage />} path="/@:username/:postId" />
    </Routes>
    </>
  );
}

export default App;
