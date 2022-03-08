12월 16일에는
유저 모듈을 만들꺼고, 로그인을 하면 유저 모듈에잇는 리덕스 스테이트에서 유저정보가 업데이트가되고,
그러면 그걸 체크해서 지금 로그인이 되어있는지 안되어있는지를 알 수 있게 됨.
그리고 나서 로그인 부분을 할거고.
유저 리덕스 부분도 해야함. (로그인하고나서 리덕스모듈에 유저정보가 들어있어야 로그인이 되어있는지 안되어있는지 알수있음.)

그리고 로그아웃을 하면 유저정보를 초기화시켜주면됨.



12월 20일
레지스터 부분 백과 주고받는 부분 복습하기.
복습하고 로그인 부분 해보기, 에러처리도 해보기(ex 409가 왔을때 에러체크..? )



1월 4일
오늘 내용: 로그인 했을 때 에러처리 하는부분.(레지스터 에러처리부분 포함)
링크, 네비게이트 섞어서 하는것. 로그인했을때 로컬스토리지에 저장하는 것까지. 
복습할때 진행이 어떻게 되는건지 단계별로 확인해보기. (적어가면서 해보기)

//
auth vs user 나눈 이유는 auth에서 로그인 이나 레지스터가 성공했는지 여부를 알기위해서 

1월 10일
Logout, quill ( Write ) 글쓰기 컴포넌트
quill은 글쓰기에서 글씨쓰고 드레그해보면 여러 옵션들을 사용할 수 있게 도와줌.
useMemo를 컴포넌트 따로구분해서 불필요한 렌더링 방지
write/Editor, TagBox 작성완료 


1월 17일
Editor, Tagbox, WriteActionButton의 컨테이너들을 만들어서 거기서 redux의
사가 액션들과 데이터를 받고 컴포넌트 들로 전송해줬음 
추가된 파일
components/write/WriteActionButton
Containers/write/EditorContainer, TagBoxContainer, WriteActionButtonsContainer
api/posts
modules/write



1월 24일
숙제: 포스트 목록 불러오기
    qs 라는 라이브러리를 다운받아서 
    const queryString = qs.stringify({
        page, username, tag
    });
    client.get(`/api/posts?${queryString}`);
    이런식으로 날리게됨.

오늘한 내용: common폴더에 SubInfo, Tags 공통으로 되는 부분 빼줬고,
          post 폴더에 PostList, PostViewer 컴포넌트 작성,
          Conatiner 폴더->post->PostViewerContainer작성
          modules 폴더에 post 리듀터밑 사가 작성하고 index(root)에 추가



2월 14일
    오늘한 내용: 
        backend: posts->posts.crtl 에서 sanitize 를 사용하여 보안 강화, script태그 같은거 걸름
        frontend: components->post->PostList
                  Containers->posts->PostListContainer
                  lib->api->posts 에서 qs를 사용하여 query로 날림
                  modules->posts 추가
                  pages->PostListPage

    다음주 할 것
        페이지네이션
        수정삭제기능
        리엑트 헬멧(메타정보 관리)


2월 23일
    페이지네이션 완료. prev , next
    핵심은 useLocation, location.search로 url을가지고 바뀌는 경우에따라 계속 useEffect로 값을 axios.get으로 데이터를 가져옴.
    PaginationContainer에 axios가없는건 PostListContainer에서 redux store값이 바뀌는걸로 값을 가져와서.

    meta를 쓴이유는 header 에서 lastPage 를 저장해서 가지고 오려고.
    
    수정된 부분: back에서 posts.ctrl -> list부분
              front에서 Button.js
                       components -> posts생성 -> Pagination.js
                       Containers -> posts -> PaginationContainer 생성
                                              PostListContainer 수정
                       createRequestSaga -> success했을 때 meta정보 (lastPage를 header에 저장한거 가져오려고) 추가
                       modules -> posts 수정(lastPage를 server에서 ctx.headers에 담은걸 가져와서 저장 from meta)
                       
                       PostLIstPage에 작성한 prev next 페이지네이션 컴포넌트 추가
    다음주
        수정삭제기능
        리액트 헬멧(메타정보 관리): 구글검색같은거 했을때 밑에 조그만하게 컨텐트가 뜨는거 Search 관련


3월 3일
    수정완료
    
    다음주: 삭제기능, 리액트 헬멧: search 관련
    

3월 7일
    request요청후 return 을 해야만 await가 먹힘!!!! promise를 리턴해야함
    
    react-helmet-async 모듈 설치 -> 검색엔진
    
    SEO란 meta데이터안에 검색이되게끔.. (Search Engin Optimiztion)
    그리고 초기 렌더링을 빠르게 하기위해서 
    이두개를 위해서는 서버사이드 렌더링 이란게 필요: next js라는것. 




    
