import { StyledScroll } from '@components/detailModal/style';
import GameContainer from '@components/game/GameContainer';
import { useAppSelector } from '@store/hook';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { RefObject, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const zepmapia = () => {
  const [channelState, setChannelState] = useState(false);
  const router = useRouter();
  // const me = useAppSelector((state) => state.userSlice.me);
  const [isLoading, setLoader] = useState(true);
  // const [frame, setFrame] = useState<HTMLIFrameElement | null>(null);
  // const [testNode, setTestNode] = useState<HTMLIFrameElement | null>(null);
  // const mountNode = frame?.contentWindow?.document;
  // const zzz = testNode?.contentWindow?.document;
  // const startPolling = () => {
  //   console.log('startPolling');
  //   if (document.getElementById('embedIframe') !== null) {
  //     console.log('react is ready');
  //     return;
  //   }
  //   setTimeout(startPolling, 1000);
  // };
  // useEffect(() => {
  //   // setTestNode(() => document.querySelector('iframe'));
  //   const test = document.querySelector('#zepiframe');
  //   (test as HTMLIFrameElement).onload = () => {
  //     const test2 = test?.querySelector('#embedIframe');
  //     console.log(test2);
  //   };
  //   window.addEventListener('message', (e: any) => {
  //     console.log(e.data);
  //     if (e.data.name) {
  //       console.log(document.querySelector('iframe'));

  //       if (document.querySelector('iframe')) {
  //         document.querySelector('iframe')?.addEventListener('message', (e: any) => {
  //           console.log(e);
  //         });
  //       }
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   // setFrame(() => document.querySelector('#zepiframe'));
  //   // setLoader(document.readyState == 'complete');
  //   // if (frame !== null) {
  //   //   (frame as HTMLIFrameElement).onload = () => {
  //   //     startPolling();
  //   //   };
  //   // }
  //   // if (frame !== null) {
  //   //   (frame as HTMLIFrameElement).onload = () => {
  //   //     startPolling();
  //   //   };
  //   // }
  //   frame?.addEventListener('load', () => {
  //     console.log('asdasdas');
  //   });
  //   frame?.addEventListener('message', handler);
  //   function handler(e: any) {
  //     console.log('hi');
  //     console.log(e.data);
  //   }
  //   // startPolling();
  //   // console.log(frame);
  //   // console.log(frame?.contentWindow?.document.body);
  // }, [mountNode, frame]);

  // $('#iframe').load(function () {
  //   $(this)
  //     .contents()
  //     .find('body')
  //     .append(
  //       '<scr' +
  //         'ipt type="text/javascript">alert(1)</scr' +
  //         'ipt>',
  //     );
  // });

  // $('#iframe').contents().find('body').append(scriptTag);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  const id = router.query.id;
  const onToggleChannel = useCallback(() => {
    setChannelState((state) => !state);
  }, [setChannelState]);
  return (
    <>
      <Head>
        <title>{`오목게임 - 젭 | 모두메타`}</title>
      </Head>
      {id && (
        <StyledIframe
          // ref={(data) => setFrame(data)}
          id="zepiframe"
          src={`https://zep.us/play/${id}`}
          allow="camera *;microphone *"
          sandbox="allow-scripts allow-same-origin allow-storage-access-by-user-activation"
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

export default zepmapia;

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
  border-image: url(https://klaykingdoms.com/assets/popup_00_frame.a5e41d63.png) 50 50;
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
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(0deg, rgba(6, 14, 131, 1) 0%, rgba(12, 25, 180, 1) 100%);
  border: none;
  :hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(0deg, rgba(0, 3, 255, 1) 0%, rgba(2, 126, 251, 1) 100%);
  }
`;
