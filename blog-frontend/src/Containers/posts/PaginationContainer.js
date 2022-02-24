import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = () => {  //tag, username, page, lastpage알아야함..
    const { username } = useParams();
    const location = useLocation();
    const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['posts/LIST_POSTS']
    }));

    if(!posts || loading) return null;

    const {tag, page = 1} = qs.parse(location.search, { ignoreQueryPrefix: true}) // 앞에?를 없애는것? //location.search는 url에서 뒤쪽에 query스트링으로 나오는것들

    console.log('search=', location.search);
    return (
        <Pagination
            tag={tag}
            username={username}
            page={parseInt(page, 10)}
            lastPage={lastPage}
        />
    )
}

export default PaginationContainer;

//여기선 axios따로 없는게 posts 와 lastPage값을 리덕스 스토어에서 가져와서쓰는데이건
// PostListContainer.js에서 useEffect로 디스페치로 가져와서 set하고 있음.