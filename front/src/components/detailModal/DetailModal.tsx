import CommentModal from '@components/commentModal/CommentModal';
import parse from 'html-react-parser';
import { clearpostDetail, ToggleDetailState } from '@slices/postSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import React, { useEffect, useState } from 'react';
import DetailHeader from './DetailHeader';
import HeartAndMessage from './HeartAndMessage';
import SliderImages from './SliderImages';
import * as S from './style';
import { AnimatePresence, motion } from 'framer-motion';
import { useMedia } from '@lib/useMedia';

const DetailModal = () => {
  const [commentState, setCommentState] = useState(false);
  const postData = useAppSelector((state) => state.postSlice.postDetail);
  const { isMobile } = useMedia();
  const dispatch = useAppDispatch();
  const modalVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.23 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.23 },
    },
    leaving: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.23 },
    },
  };
  const mobileModalVariants = {
    initial: {
      transform: 'translateX(-50px)',
      opacity: 0,
      transition: { duration: 0.23 },
    },
    visible: {
      transform: 'translateX(0px)',
      opacity: 1,
      transition: { duration: 0.23 },
    },
    leaving: {
      transform: 'translateX(-50px)',
      opacity: 0,
      transition: { duration: 0.23 },
    },
  };

  return (
    <>
      {postData && (
        <S.ModalWrapper>
          <S.Dim
            onClick={() => {
              dispatch(ToggleDetailState(false));
              dispatch(clearpostDetail());
              setCommentState(false);
            }}
          />
          <AnimatePresence>
            <S.Modal
              commentState={commentState}
              variants={isMobile ? mobileModalVariants : modalVariants}
              initial="initial"
              animate="visible"
              exit="leaving"
              key="detailModal"
            >
              <DetailHeader setCommentState={setCommentState} />
              <SliderImages />
              <HeartAndMessage commentState={commentState} setCommentState={setCommentState} />
              <S.ContentBox>
                <S.Content>
                  {typeof postData.content === 'string'
                    ? parse(postData.content)
                    : postData.content}
                </S.Content>
              </S.ContentBox>
            </S.Modal>

            {isMobile ? (
              commentState && (
                <CommentModal
                  commentState={commentState}
                  postData={postData}
                  setCommentState={setCommentState}
                />
              )
            ) : (
              <CommentModal
                commentState={commentState}
                postData={postData}
                setCommentState={setCommentState}
              />
            )}
          </AnimatePresence>
        </S.ModalWrapper>
      )}
    </>
  );
};

export default DetailModal;
