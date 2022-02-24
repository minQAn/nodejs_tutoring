import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem; 
`;

const PageNumber = styled.div`

`;

//이전페이지?
const buildLink = ({ username, tag, page }) => {
    const query = qs.stringify({ tag, page }); // tag=sdf&page=3
    return username ? `/@${username}?${query}` : `/?${query}`; //유저가있는경우는 그유저가 작성한 글을 보여주는 리스트, 없는경우는 그냥 일반 리스트
}

const Pagination = ({ page, lastPage, username, tag }) => {
    return(
        <PaginationBlock>
            <Button //전페이지로 돌아가는 버튼
                disabled={page === 1}
                to={
                    page === 1 ? undefined : buildLink({ username, tag, page: page - 1})
                }
            >Prev</Button>
            <PageNumber>{page}</PageNumber>
            <Button
                disabled={page === lastPage}
                to={
                    page === lastPage ? undefined : buildLink({ username, tag, page: page + 1 })
                }
            >Next</Button>            
        </PaginationBlock>
    )
}

export default Pagination;