import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {   //button 다음에 연달아오는 button 들을 말하는거
        margin-left: 0.5rem;        
    }
`;

//컴포넌트는 무조건 앞에 대문자로써야 적용됨
const StyledButton = styled(Button)` //extended 가 important 우선시됨, 부모에 important가없다면
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;        
    }    
`;

const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => {
    return(
        <WriteActionButtonBlock>
            <StyledButton cyan onClick={onPublish}>
                {isEdit ? 'Edit' : 'Post'}
            </StyledButton>
            <StyledButton onClick={onCancel}>Cancel</StyledButton>
        </WriteActionButtonBlock>
    )
}

export default WriteActionButtons;