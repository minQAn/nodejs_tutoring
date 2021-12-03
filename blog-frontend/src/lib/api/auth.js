import client from './client'; // axios를 가져와서 쓰는거임.. (중복을 줄이기위해)

// Login
export const login = ({username, password}) => 
    client.post('/api/auth/login', {username, password}); //백엔드에 있는 url로 리퀘스트를 보내는거임

// Register
export const register = ({username, password}) => 
    client.post('/api/auth/register', {username, password});

// Check Login Status
export const check = () => 
    client.get('/api/auth/check');
