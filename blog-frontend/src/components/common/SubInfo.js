import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const SubInfoBlock = styled.div`
    ${
        props => props.hasMarginTop && css`
            margin-top: 1rem;
        `
    }
    
    color: ${palette.gray[6]};

    span + span:before{
        color: ${palette.gray[5]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';  //아스키코드인가봄 중간 점 임
    }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
    return(
        <SubInfoBlock hasMarginTop={hasMarginTop}>
            <span>
                <b>
                    <Link to={`/@${username}`}>{username}</Link>
                </b>
            </span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>            
        </SubInfoBlock>
    )
}

export default SubInfo;