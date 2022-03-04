import client from './client';
import qs from 'qs';

export const writePost = ({ title, body, tags }) => 
    client.post('/api/posts', { title, body, tags });

    
export const readPost = id => client.get(`/api/posts/${id}`);


// query로 변환해서 보줌 // ?page=2&username=test&tag=testtag
// 원래는 이렇게해야함..-> `/api/posts?page=${page}/`
// password같은경우는 body에 보내는게 안전할거고.. url은 길지않은 데이터들..like page, username정도..?
export const listPosts = ({ page, username, tag}) => {
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    return client.get(`/api/posts?${queryString}`);
}

export const updatePost = ({id, title, body, tags}) => 
    client.patch(`/api/posts/${id}`, {
        title,
        body,
        tags,
    });
