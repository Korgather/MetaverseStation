import { StyledScroll } from '@components/detailModal/style';
import GameContainer from '@components/game/GameContainer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Zepmapia = () => {
  const [channelState, setChannelState] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const onToggleChannel = useCallback(() => {
    setChannelState((state) => !state);
  }, [setChannelState]);
  return (
    <>
      <Head>
        <title>{`마피아게임 - 젭 | 모두메타`}</title>
      </Head>
      {id && (
        <StyledIframe
          src={`https://zep.us/play/${id}`}
          allow="camera *;microphone *"
        ></StyledIframe>
      )}
      <StyledButton onClick={onToggleChannel} type="button">
        채널변경
      </StyledButton>
      {channelState && (
        <IframeWrapper>
          <GameContainer />
        </IframeWrapper>
      )}
    </>
  );
};

export default Zepmapia;

const StyledIframe = styled.iframe`
  display: block;
  border: none;
  height: 100vh;
  width: 100vw;
  position: relative;
`;
const IframeWrapper = styled.div`
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 70px;
  left: 20px;
  border: 1px solid black;
  width: 350px;
  height: 630px;
  background-color: #323232e6;
  color: #aaa;
  border: 12px solid;
  border-image: url(https://klaykingdoms.com/assets/popup_00_frame.a5e41d63.png)
    50 50;
  overflow-y: scroll;
  ${StyledScroll}
`;

const StyledButton = styled.button`
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  top: 20px;
  left: 20px;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(
    0deg,
    rgba(6, 14, 131, 1) 0%,
    rgba(12, 25, 180, 1) 100%
  );
  border: none;
  :hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(
      0deg,
      rgba(0, 3, 255, 1) 0%,
      rgba(2, 126, 251, 1) 100%
    );
  }
`;
