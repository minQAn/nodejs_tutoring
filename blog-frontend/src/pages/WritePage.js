import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../Containers/write/EditorContainer';
import TagBoxContainer from '../Containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../Containers/write/WriteActionButtonsContainer';

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer />
            <TagBoxContainer />
            <WriteActionButtonsContainer />
        </Responsive>
    )
}

export default WritePage;