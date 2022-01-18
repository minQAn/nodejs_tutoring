import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
    const dispatch = useDispatch();
    const { title, body } = useSelector(({write}) => ({
        title: write.title, // state.write.title
        body: write.body
    }));

    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [dispatch]);


    // clean up function?
    useEffect(() => { // 유저가 적었던 redux값을 초기화하려고
        return () => {  //리턴하면 그 안에 함수는 이 컴포넌트가 unMounted될때 실행됨 // 하는 이유는 다른 컴포넌트(페이지)를 갔다오면 기존 데이터가 남아있어서 초기화해주려고
            dispatch(initialize());  //setTimeOut같은거 페이지바꾸면 작동되면 안되기때문에 clean up작업을 해줘야함
        }
    }, [dispatch]);

    return <Editor onChangeField={onChangeField} title={title} body={body} />
}

export default EditorContainer;