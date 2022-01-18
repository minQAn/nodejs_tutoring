import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../modules/write';
import TagBox from '../../components/write/TagBox';


//여기서 initialize안해도됨 Editor와 같은페이지고 Editor 컴포넌트가 사라지면 알아서될거기때문에

const TagBoxContainer = () => {
    const dispatch = useDispatch();
    const tags = useSelector(state => state.write.tags);

    const onChangeTags = nextTags => {
        dispatch(
            changeField({
                key: 'tags',
                value: nextTags
            })
        )
    };

    return <TagBox onChangeTags={onChangeTags} tags={tags} />;
}

export default TagBoxContainer;
