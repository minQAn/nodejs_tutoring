import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 2rem;

    h4 {
        color: ${palette.gray[8]};
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.gray[9]};
    input, button {
        outline: none;
        border: none;
        font-size: 1rem;
    }

    input {
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }

    button {
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &:hover{
            background: ${palette.gray[6]};
        }        
    }
`;

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }    
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

//memo : 잦은 리렌더링을 방지하기 위해 사용. [테그리스트, 인풋값] 이 바뀔때 
const TagItem = React.memo(({tag, onRemove}) => (
    <Tag onClick={() => onRemove(tag)}>${tag}</Tag>
));  //tag가 바뀔때만 리렌더링

const TagList = React.memo(({tags, onRemove}) => (
    <TagListBlock>
        {tags.map((tag) => (
            <TagItem key={tag} tag={tag} onRemove={onRemove} />
        ))}
    </TagListBlock>
));

const TagBox = () => {

    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(  //함수 재 생성을 방지
        tag => {
            if(!tag) return;
            if(localTags.includes(tag)) return; //이미 추가한 tag는 방지
            setLocalTags([...localTags, tag]);
        }, [localTags, setLocalTags]
    );

    // tag를 클릭했을때 remove 되는걸로 했음
    const onRemove = useCallback(
        tag => {
            setLocalTags(localTags.filter(t => t !== tag));
        }, [localTags, setLocalTags]
    );

    const onChange = useCallback(
        e => {
            setInput(e.target.value)
        }, []
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            insertTag(input.trim());
            setInput('');            
        }, [input, insertTag]
    );

    return (
        <TagBoxBlock>
            <h4>Tag</h4>
            <TagForm onSubmit={onSubmit}>
                <input placeholder='Input Tag' input={input} onChange={onChange} value={input}/>
                <button type='submit'>Add</button>
            </TagForm>
            {/* 위 아래로 따로 나눠야 불필요한 리렌더링을 안함. */}
            <TagList tags={localTags} onRemove={onRemove} />            
        </TagBoxBlock>
    );
}

export default TagBox;