import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1{
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;


const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

const PostViewer = ({post, error, loading, actionButtons}) => {
    if(error){
        if(error.response && error.response.state === 404){
            return <PostViewerBlock>Post is not exist.</PostViewerBlock>
        }
        return <PostViewerBlock>Error!!</PostViewerBlock>
    }

    if(loading || !post){
        return null;
    }

    const { title, body, user, publishedDate, tags } = post;
    
    return(
        <PostViewerBlock>
            <Helmet>
                <title>{title} - DEV! </title> {/* 글제목을 페이지 타이틀로 바꿔봤음*/}
            </Helmet>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo username={user.username} publishedDate={new Date(publishedDate).toLocaleDateString()} hasMarginTop />
                <Tags tags={tags} />                                    
            </PostHead>

            {actionButtons}
            
            <PostContent dangerouslySetInnerHTML={{__html: body}} /> {/* dangerouslySetInnerHTML는 쓰는이유는 quill 에디터에서는 text식으로 나오기때문에 */}
        </PostViewerBlock> 
    );
}

export default PostViewer;