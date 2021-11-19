import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;  //어떤게 포커스가 됬는지..?
    cursor: pointer;
    
    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }

    // 넓이에 관한 attribute
    ${props =>  // fullWidth라는 props를 넘겨주면 밑에 css가 적용이됨.
        props.fullWidth && 
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `
    }

    // 색깔에 관한 attribute  
    ${props => 
        props.cyan &&
        css`
            background: ${palette.cyan[5]};
            &:hover {   //여기 오타나면 위에꺼가 적용된다.
                background: ${palette.cyan[4]}

            }
        `
    }
`;

const Button = props => <StyledButton {...props} /> //onClick같은 것들을 보내오면 받아온 props를 그대로 넘겨줌

export default Button;



