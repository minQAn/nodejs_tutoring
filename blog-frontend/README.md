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
    
