import { loadComPost } from '@actions/community';
import { loadPost, viewPost } from '@actions/post';
import { loadMyInfo } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import CommunityWriteModal from '@components/community/writeModal/CommunityWriteModal';
import CommentInput from '@components/ComPostDetail/CommentInput';
import CommentList from '@components/ComPostDetail/CommentList';
import ContentBox from '@components/ComPostDetail/ContentBox';
import { clearComPostDetail } from '@slices/communitySlice';
import { logOut, saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import { useAppDispatch, useAppSelector } from '@store/hook';
import axios from 'axios';
import cookies from 'next-cookies';
import Head from 'next/head';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@assets/motionVarints';

const ComDetailPost = () => {
  const communityWriteModalState = useAppSelector(
    (state) => state.communitySlice.communityWriteModalState,
  );
  const dispatch = useAppDispatch();
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const isZep = postDetail?.category === 'METAVERSE_ZEP';
  const isGather = postDetail?.category === 'METAVERSE_GATHERTOWN';
  useEffect(() => {
    return () => {
      dispatch(clearComPostDetail());
    };
  }, []);

  return (
    <>
      <Head>
        {isGather ? (
          <title>{`${postDetail?.title} - 게더타운맵 | 모두메타`}</title>
        ) : isZep ? (
          <title>{`${postDetail?.title} - 젭맵 | 모두메타`}</title>
        ) : (
          <title>{`${postDetail?.title} - 모두메타 | 커뮤니티`}</title>
        )}
      </Head>
      {communityWriteModalState && <CommunityWriteModal />}
      <AppLayout>
        {postDetail ? (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={`post/${postDetail.id}`}
              variants={pageVariants}
              initial="initial"
              animate="visible"
              exit="leaving"
            >
              <ComDetailPostLayout>
                <ContentBox />
              </ComDetailPostLayout>
              <CommentInput />
              <CommentList />
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            <div>삭제된 게시물입니다.</div>
          </>
        )}
      </AppLayout>
    </>
  );
};

export default ComDetailPost;

const ComDetailPostLayout = styled.div`
  width: 60vw;
  max-width: 700px;
  @media screen and (max-width: 850px) {
    width: 80vw;
  }
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

  await store.dispatch(loadComPost(Number(ctx.query.id as string)));
  await store.dispatch(viewPost(Number(ctx.query.id as string)));

  return { props: {} };
});
