import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButton';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { title, body, tags, post, postError, originalPostId } = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId: write.originalPostId      
    }));

    const onPublish = () =>{
        if(originalPostId){ // originalPostId로 수정을할껀데 이게 있으면 Edit버튼 실행이고 아니면 글등록
            dispatch(updatePost({title, body, tags, id: originalPostId})); 
            return;
        }
        dispatch(writePost({title, body, tags}))
    };

    const onCancel = () => {
        navigate(-1); // -1이 뒤로가기라고 함
    }

    useEffect(() => {
        if(post){
            const {_id, user} = post;
            navigate(`/@${user.username}/${_id}`); // 서버로..
        }

        if(postError){
            console.log(postError);
        }        
    }, [navigate, post, postError])

    return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId} />; // !! 느낌표가 두개일떄 빈오브젝트가오면 false->의 반대로 true가됨.그러면서 확실하게 boolean값으로 바꿈,즉 값이있으면 true로 해라
}

export default WriteActionButtonsContainer;