import { loadComPost } from '@actions/community';
import { viewPost } from '@actions/post';
import AppLayout from '@components/AppLayout/AppLayout';
import CommunityWriteModal from '@components/community/writeModal/CommunityWriteModal';
import CommentInput from '@components/ComPostDetail/CommentInput';
import CommentList from '@components/ComPostDetail/CommentList';
import ContentBox from '@components/ComPostDetail/ContentBox';
import { clearComPostDetail } from '@slices/communitySlice';
import wrapper from '@store/configureStore';
import { useAppDispatch, useAppSelector } from '@store/hook';
import Head from 'next/head';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@assets/motionVarints';
import { media } from '@styles/theme';
import axios from 'axios';

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
  ${media.mobile} {
    width: 80vw;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(loadComPost(Number(ctx.query.id as string)));
  await store.dispatch(viewPost(Number(ctx.query.id as string)));
  return { props: {} };
});
