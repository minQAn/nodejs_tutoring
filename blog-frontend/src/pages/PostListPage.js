import React from 'react';
import HeaderContainer from '../Containers/common/HeaderContainer';
import PaginationContainer from '../Containers/posts/PaginationContainer';
import PostListContainer from '../Containers/posts/PostListContainer';

const PostListPage = () => {
    return (
        <div>
            <HeaderContainer />
            <PostListContainer />
            <PaginationContainer />
        </div>
    );
}

export default PostListPage;