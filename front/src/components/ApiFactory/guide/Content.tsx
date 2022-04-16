import Script from 'next/script';
import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-scroll';
import { Image } from 'antd';
const Content = () => {
  return (
    <>
      <Title>📄게더타운 ApiFactory 이용가이드</Title>
      <SubTitle id="config">1. Config값(API키, 맵ID, 룸ID) 얻는 방법</SubTitle>
      <ContentContainer>
        <h3>{`▶ API키 얻는방법`}</h3>
        <ul>
          <StyledLi>
            {`게더타운에 로그인 한 후, 새 탭을 열고 `}
            <a href="https://gather.town/apikeys" target="_blank" rel="noreferrer">
              {`"https://gather.town/apikeys"`}
            </a>
            {` 로 접속해주세요.`}
          </StyledLi>
          <StyledLi>{`'generate new key’를 클릭하면 'API키' 값을 얻을 수 있습니다.`}</StyledLi>
          <StyledLi>
            API 키 값은 계정에 대한 고유번호이기 때문에, 유출되면 맵을 해킹 당할 수 있는 위험이
            있으니, 절대 다른 사람에게 공유하시면 안됩니다.
          </StyledLi>
          <StyledImg src="../../images/guide01/apikey.png" alt="" width={'50%'} />
        </ul>
      </ContentContainer>
      <ContentContainer>
        <h3>{`▶ 맵 ID 얻는방법`}</h3>
        <ul>
          <StyledLi>{`게더타운 맵에 접속했을 때, 주소창에서 'app/' 이후의 값이 '맵 ID' 입니다. `}</StyledLi>
          <StyledImg src="../../images/guide01/mapid.png" alt="" width={'50%'} />
        </ul>
      </ContentContainer>
      <ContentContainer>
        <h3>{`▶ 룸 ID 얻는방법`}</h3>
        <ul>
          <StyledLi>{`맵 메이커에서 Rooms탭에 나와있는 것이 '룸 이름' 입니다.`}</StyledLi>
          <StyledLi>{`사진에서는 empty-room-small-brick, taste로 두개의 룸 이름이 존재하네요.`}</StyledLi>
          <StyledImg src="../../images/guide01/roomid.png" alt="" width={'50%'} />
        </ul>
      </ContentContainer>
      <SubTitle id="exportmap">2. 맵파일 추출하기</SubTitle>
      <ContentContainer step="two">
        <ul>
          <StyledLi>{`Config값 (API키 , 맵 ID, 룸 ID)을 모두 입력하신 후, 맵 파일 추출을 눌러주세요.`}</StyledLi>
          <StyledLi>{`값이 정확하게 입력 되었다면, 아래 영상과 같이 맵 파일이 다운로드 됩니다.`}</StyledLi>
          <StyledImg src="../../images/guide01/exportmap.gif" alt="" width={'100%'} />
        </ul>
      </ContentContainer>
      <SubTitle id="importmap">3. 맵파일 적용하기</SubTitle>
      <ContentContainer step="two">
        <ul>
          <StyledLi>{`Config값 (API키 , 맵 ID, 룸 ID)을 모두 입력해 주세요.`}</StyledLi>
          <StyledLi>{`추출한 맵 파일을 업로드 하신 후, ok버튼을 눌러주세요.`}</StyledLi>
          <StyledImg src="../../images/guide01/importmap.gif" alt="" width={'100%'} />
        </ul>
      </ContentContainer>
      <SubTitle id="importbgm">4. 배경음악 넣기</SubTitle>
      <ContentContainer step="two">
        <ul>
          <StyledLi>{`Config값 (API키 , 맵 ID, 룸 ID)을 모두 입력해 주세요.`}</StyledLi>
          <StyledLi>
            {`Config입력창 바로 밑에 입력칸에서 오브젝트 ID를 선택해주세요.`}
            <br />
            {`( 이후, 배경음악 정보를 가져올 때 사용 - 배경음악 정보 로드하기)`}
          </StyledLi>
          <StyledLi>{`음악Url  -  배경음악으로 사용하실 Url을 입력해주세요. `}</StyledLi>
          <ul>
            <StyledLi step="1">
              <Link to="ref" spy={true} smooth={true}>
                게더타운에서 유효한 배경음악 Url만드는 방법 보러가기
              </Link>
              <br /> {`( 잘못된 Url입력시 오브젝트만 생성되고 음악이 들리지 않습니다. )`}
            </StyledLi>
          </ul>
          <StyledLi>{`x좌표, y좌표 : 배경음악 오브젝트가 생성될 위치의 좌표를 적어주세요.`}</StyledLi>
          <StyledLi>{`범위 : 배경음악의 범위를 적어주세요 (0 ~ 1000) - 범위는 1당 1칸입니다.`}</StyledLi>
          <StyledLi>{`볼륨 : 배경음악의 볼륨을 적어주세요 (0 ~ 1)`}</StyledLi>
          <StyledLi>{`loop : 배경음악의 반복여부를 체크해주세요. 체크 O :  무한 반복,  체크 X : 한번만 실행`}</StyledLi>
          <StyledImg src="../../images/guide01/importbgm.gif" alt="" width={'100%'} />
        </ul>
      </ContentContainer>
      <SubTitle id="loadbgm">5. 배경음악 정보 로드한 후, 정보 바꾸기</SubTitle>
      <ContentContainer step="two">
        <ul>
          <StyledLi>{`Config값 (API키 , 맵 ID, 룸 ID)을 모두 입력해 주세요.`}</StyledLi>
          <StyledLi>
            {`이전에 배경음악을 등록했던 ID를 선택한 후, 로드하기 버튼을 눌러주세요.`}
          </StyledLi>
          <StyledLi>{`오브젝트 ID에 매치되는 정보가 자동으로 로드됩니다.`}</StyledLi>
          <StyledLi>{`배경음악 정보를 바꾸신 후, ‘배경음악 넣기’ 버튼을 누르시면 바뀐 정보로 오브젝트가 재설치 됩니다.`}</StyledLi>
          <StyledImg src="../../images/guide01/loadbgm.gif" alt="" width={'100%'} />
        </ul>
      </ContentContainer>
      <SubTitle id="ref">※ 참고 : 게더타운에서 유효한 배경음악 Url만드는 방법</SubTitle>
      <ContentContainer step="two">
        <ul>
          <StyledLi>{`준비물 : 음악파일, 구글드라이브 아이디`}</StyledLi>
        </ul>
        <ol>
          <StyledLi>
            {`구글 드라이브에 Mp3파일 업로드 후 , 링크 복사하기 - 아래 이미지 순서대로 따라해주세요.`}
          </StyledLi>
          <StyledImg src="../../images/guide01/ref01.png" alt="" width={'100%'} />
          <StyledLi>
            {`아래 링크로 접속해주세요.`}
            <br />
            <Script src="//cdn.iframe.ly/embed.js" strategy="beforeInteractive" />
            <div
              style={{ marginBottom: '40px' }}
              dangerouslySetInnerHTML={{
                __html: `<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://sites.google.com/site/gdocs2direct/" data-iframely-url="//iframely.net/vqX7FiV?card=small"></a></div></div><script async src="//iframely.net/embed.js" charset="utf-8"></script>`,
              }}
            />
          </StyledLi>
          <StyledLi>{`복사한 링크를 입력한 후, ‘Create Direct Link’ 클릭`}</StyledLi>
          <StyledImg src="../../images/guide01/ref02.png" alt="" width={'100%'} />
          <StyledLi>{`Output link에 생성된 링크를 복사해서 게더타운 배경음악 url로 이용해주시면 됩니다. `}</StyledLi>
          <StyledImg src="../../images/guide01/ref03.png" alt="" width={'100%'} />
        </ol>
      </ContentContainer>
    </>
  );
};

export default Content;
interface step {
  step?: string;
}

const Title = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  border-bottom: 1px soStyledLid #dbdbdb;
  padding: 20px 0;
`;

const SubTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 30px;
  :not(:first-of-type) {
    margin-top: 150px;
  }
`;

const ContentContainer = styled.div<step>`
  margin-left: 20px;
  margin-top: 20px;
  font-size: 1rem;
  h3 {
    font-size: 1.1rem;
    font-weight: 550;
  }

  ${(props) =>
    props.step === 'two' &&
    css`
      ul,
      ol {
        padding-left: 20px;
      }
      margin-top: 0;
    `}
`;

const StyledImg = styled(Image)`
  margin-top: 15px;
  margin-bottom: 50px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const StyledLi = styled.li<step>`
  + li {
    margin-top: 10px;
  }
  + ul {
    margin-bottom: 10px;
  }
  + ol {
    margin-bottom: 10px;
  }
  ${(props) =>
    props.step === '1' &&
    css`
      margin-top: 8px;
    `}
`;
