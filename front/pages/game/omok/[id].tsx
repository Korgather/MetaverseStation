import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@store/hook';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import wrapper from '@store/configureStore';
import { logOut, saveAccessToken } from '@slices/userSlice';
import { loadMyInfo } from '@actions/user';
import cookies from 'next-cookies';
import LoginModalView from '@components/game/loginModal/LoginModalView';
import GameNav from '@components/game/gameNav';
import ProfileCard from '@components/game/gameNav/ProfileCard';
import GameChannelChange from '@components/game/GameChannelChange';

const zepmapia = () => {
  const [channelState, setChannelState] = useState(false);
  const router = useRouter();
  const me = useAppSelector((state) => state.userSlice.me);
  const [startCondition, setStartCondition] = useState(true);
  const [profileCardState, setProfileCardState] = useState(false);

  useEffect(() => {
    window.addEventListener('message', (e: MessageEvent) => {
      console.log(e.data);
      if (e.data.event === 'JOINED_MAP') {
        if (me) {
          const iframe = document.querySelector('iframe');
          (iframe as HTMLIFrameElement).contentWindow?.postMessage(
            {
              type: 'signin',

              name: me?.userName,
              zepMessage: true,
            },
            '*',
          );
          return;
        }
        setStartCondition(() => false);
      }
    });
  }, []);
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
      <GameNav
        onToggleChannel={onToggleChannel}
        channelState={channelState}
        setProfileCardState={setProfileCardState}
        profileCardState={profileCardState}
      />
      <LoginModalView setStartCondition={setStartCondition} startCondition={startCondition} />
      <ProfileCard
        profileCardState={profileCardState}
        setProfileCardState={setProfileCardState}
        setStartCondition={setStartCondition}
      />

      {channelState && (
        <GameChannelChange channelState={channelState} setChannelState={setChannelState} />
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  store.dispatch(logOut());
  axios.defaults.headers.common['Authorization'] = '';
  const token = cookies(ctx).Token;
  if (ctx.req && token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    store.dispatch(saveAccessToken(token));
    await store.dispatch(loadMyInfo());
  }

  return { props: {} };
});
