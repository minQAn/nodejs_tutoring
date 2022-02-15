import React from 'react';
import HeaderContainer from '../Containers/common/HeaderContainer';
import PostListContainer from '../Containers/posts/PostListContainer';

const PostListPage = () => {
    return (
        <div>
            <HeaderContainer />
            <PostListContainer />
        </div>
    );
}

export default PostListPage;