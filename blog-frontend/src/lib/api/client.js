// 이걸 해주면 나중에 axios에 이거저거 할 때 헤더에 뭘넣을지 베이스url등 설정하기 편해짐
// cors 에러.. proxy설정해야함

import axios from 'axios';

// instance를 만든거임.
const client = axios.create();


//client를 임포트해서 쓰는애들은 여기서 사용한 모든 설정들이 포함해서 날라감.

export default client;