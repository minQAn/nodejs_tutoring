import React, { useEffect } from 'react';
import qs from 'qs';
import { useLocation, useParams } from 'react-router-dom'; //url에있는 query부분으로 가지는 것?
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/post/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = () => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const location = useLocation(); //이게 핵심

    const { posts, error, loading, user } = useSelector(
        ({posts, loading, user}) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user
        })
    );


    useEffect(() => { //바뀌는 location.search (즉 url)이 바뀔때마다 axios.get요청이 일어나서 그에 맞는 정보를 가져옴
        const{ tag, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true  // ? 를 없애고 뒷부분만 가져오는 것 ex) ?name=minhee 이런것들..
        });
        dispatch(listPosts({tag, username, page}));        
    }, [dispatch, location.search, username]); // locaion.search란 query에서 ? 뒤에 나오는것들

    return(
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            showWriteButton={user}
        />

    );
}

export default PostListContainer;

