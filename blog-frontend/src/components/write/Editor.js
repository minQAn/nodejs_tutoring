import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
    padding-top: 5rem;
    padding-bottom: 5rem;
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;

const QuillWrapper = styled.div`
    .ql-editor{
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;        
    }

    .ql-editor.ql-blank::before{
        left: 0px;
    }    
`;

const Editor = ({ title, body, onChangeField }) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    // quill은 글쓰기에서 글씨쓰고 드레그해보면 여러 옵션들을 사용할 수 있게 도와줌..
    // 사용방법 따로 찾아서 공부해보기
    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: 'input content...',
            modules: {
                toolbar: [
                    [{header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered'}, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image']
                ]
            }
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if(source === 'user'){ //엡에있는 유저가 아니고 그냥quill에서 정한 방식임
                onChangeField({ key: 'body', value: quill.root.innerHTML });
            }
        });

    }, [onChangeField]);

    const mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return; //맨처음 랜더링될때만 여기가 실행되고, 값이 변할때마다 변경되는걸 방지하기위해
        mounted.current = true;
        quillInstance.current.root.innerHTML = body; //quill라이브러리 사이트 참고        
    }, [body]);// 바디가 변경될때마다, 처음에는 mounted false주고 나중에 true로바꿔주면 이컴포넌트가 없어지기 전까지는 이 마운티드라는애는 true라는값을 가지고있음.

    
    // quill 이라는 에이터를 쓸때는 이런식으로 한번 거쳐야 됨.
    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value })
    };

    
    return (
        <EditorBlock>
            <TitleInput placeholder='Input title...' onChange={onChangeTitle} value={title} />
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
    )
}

export default Editor;