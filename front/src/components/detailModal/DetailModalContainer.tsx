import CommentModal from '@components/commentModal/CommentModal';
import { clearpostDetail, ToggleDetailState } from '@slices/postSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import React, { useState } from 'react';
import * as S from './style';
import { AnimatePresence } from 'framer-motion';
import { useMedia } from '@lib/useMedia';
import DetailModal from './DetailModal';

const DetailModalContainer = () => {
  const [commentState, setCommentState] = useState(false);
  const postData = useAppSelector((state) => state.postSlice.postDetail);
  const { isMobile } = useMedia();
  const dispatch = useAppDispatch();

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
            {isMobile ? (
              !commentState && (
                <DetailModal
                  commentState={commentState}
                  setCommentState={setCommentState}
                  postData={postData}
                />
              )
            ) : (
              <DetailModal
                commentState={commentState}
                setCommentState={setCommentState}
                postData={postData}
              />
            )}

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

export default DetailModalContainer;
