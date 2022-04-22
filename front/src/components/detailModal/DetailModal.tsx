import CommentModal from '@components/commentModal/CommentModal';
import parse from 'html-react-parser';
import { clearpostDetail, ToggleDetailState } from '@slices/postSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import React, { useState } from 'react';
import DetailHeader from './DetailHeader';
import HeartAndMessage from './HeartAndMessage';
import SliderImages from './SliderImages';
import * as S from './style';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DetailModal = () => {
  const [commentState, setCommentState] = useState(false);
  const postData = useAppSelector((state) => state.postSlice.postDetail);
  const dispatch = useAppDispatch();
  const modalVariants = {
    initial: {
      y: -200,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    leaving: {
      opacity: 0,
      scale: 0,
    },
  };
  return (
    <>
      {postData && (
        <AnimatePresence>
          <S.ModalWrapper
            variants={modalVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
          >
            <S.Dim
              onClick={() => {
                dispatch(ToggleDetailState(false));
                dispatch(clearpostDetail());
              }}
            />
            <S.Modal commentState={commentState}>
              <DetailHeader />
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

            <CommentModal
              commentState={commentState}
              postData={postData}
              setCommentState={setCommentState}
            />
          </S.ModalWrapper>
        </AnimatePresence>
      )}
    </>
  );
};

export default DetailModal;
