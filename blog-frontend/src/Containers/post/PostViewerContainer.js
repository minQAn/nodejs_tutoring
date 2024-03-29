import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unloadPost, readPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
  //match는 라우터에서 :하고 들어오는 부분 /:postId
  const { postId } = useParams(); // destructure .. match.postId
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user, //버튼을 보여줄려면 유저정보가 있어야해서
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));

    return () => {
      dispatch(unloadPost()); //()로 실행해야함
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const onRemove = async () => {
    try{
        await removePost(postId); //await안하면 지우고있는도중에 리스트에가서 가져와서 지워진걸 가져오게됨 그래서 필요.
        navigate('/');
        console.log('worked');
    }catch(e){
        console.log('not working')
    }
  }

  const ownPost = (user && user._id) === (post && post.user._id); //글쓴이랑 현재유저랑 같은지 체크

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
    />
  ); // props로 component를 보낼수도 있음
};

export default PostViewerContainer;
