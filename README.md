# ModuMeta

## 1. 프로젝트 소개
- 기술 스택 
  - Frontend : TypeScript, React, NextJS, Redux, Ant-Design, StyledComponents
  - Backend : Spring, mariaDB
  - Deployment : AWS , vercel
 
- 웹 서비스에 대한 개요
  - MetaverseStation은 회원들이 서로 자신의 메타버스 공간을 공유할 수 있는 커뮤니티입니다.


## 2. 주요 기능
- PWA 적용
- OAUTH로그인 (카카오,네이버,구글)
- 글쓰기, 수정, 삭제 
- 댓글, 대댓글 쓰기, 수정, 삭제
- 게시글 조회수, 좋아요
- 카테고리별 필터
- 페이지네이션
- 검색기능
- 이미지 슬라이더
- iframe을 이용해, 메타버스게임과 로그인연동
  - 메타버스 젭으로 자체제작한 마피아, 오목 게임을 모두메타 홈페이지에 Iframe형태로 삽입
  - Iframe 과의 통신을 통해 모두메타 홈페이지와 로그인 연동
  - 전적 기록 및 게임내 닉네임 설정 가능.
- 게더타운 ApiFactory
  - 게더타운에서 제공해주는 api를 가공해서,<br/>
    기존 게더타운에 없는 기능 (배경음악 넣기, 맵파일 추출 및 적용)을 가능하게 해줍니다.
  

## 3. 프로젝트 구성도
https://www.figma.com/file/xqD6AJfmvc4PEx4kwuPf9h/MetaverseStation?node-id=0%3A1

## 4. 페이지별 화면 


| |
:------------------------------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/86244477/163527641-d5680c33-f7b0-4a7e-aad2-f1dfa6777bc0.png)|
| Main |
| ![image](https://user-images.githubusercontent.com/86244477/163516268-da5eda60-4c6b-4e09-8d4e-2ec99592779e.png)|
| MyPage |
| ![image](https://user-images.githubusercontent.com/86244477/163516315-1fd0a1a7-f878-41eb-934c-fc4b6fb9f9f3.png) |
| Detail & Comment Modal |
|![image](https://user-images.githubusercontent.com/86244477/163516357-17d295db-19eb-4e2e-a84a-1fb7dc704d20.png)|
| Community |
| ![image](https://user-images.githubusercontent.com/86244477/163516398-a95d7465-668d-49d8-9b6d-ecd162ee2abd.png) |
| CommunityDetail |
| ![exportmap](https://user-images.githubusercontent.com/86244477/163701512-fcdcf1e1-5052-4e73-92a8-c91dd44869e0.gif) |
| GathertownApiFactory - 맵파일 추출 |
| ![importmap](https://user-images.githubusercontent.com/86244477/163701525-528deb44-5dd0-4fd3-9875-76ec502fe086.gif) |
| GathertownApiFactory - 맵파일 적용 |
| ![importbgm](https://user-images.githubusercontent.com/86244477/163701544-85ca09af-e7c2-4bbc-9638-caae23d14baf.gif) |
| GathertownApiFactory - 배경음악 넣기 |


## 5. 서비스 링크
https://www.modumeta.com/
