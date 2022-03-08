import React from 'react';
import { Helmet } from 'react-helmet-async';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../Containers/write/EditorContainer';
import TagBoxContainer from '../Containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../Containers/write/WriteActionButtonsContainer';

const WritePage = () => {
    return (
        <Responsive>
            <Helmet> {/* 이렇게하면 페이지별로 페이지 title을 바꿔줄 수 있음 */}
                <title>Write Post</title>
            </Helmet>
            <EditorContainer />
            <TagBoxContainer />
            <WriteActionButtonsContainer />
        </Responsive>
    )
}

export default WritePage;