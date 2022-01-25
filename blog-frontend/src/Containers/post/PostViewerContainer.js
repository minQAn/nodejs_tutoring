import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unloadPost, readPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';

const PostViewerContainer = () => { //match는 라우터에서 :하고 들어오는 부분 /:postId
    const { postId } = useParams(); // destructure .. match.postId
    const dispatch = useDispatch();
    const { post, error, loading } = useSelector(({post, loading}) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST']
    }));

    useEffect(() => {
        dispatch(readPost(postId));

        return() => {
            dispatch(unloadPost()); //()로 실행해야함
        }
    }, [dispatch, postId]);

    return <PostViewer post={post} loading={loading} error={error} />;
}

export default PostViewerContainer;