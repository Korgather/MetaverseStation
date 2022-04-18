import CommentModal from '@components/commentModal/CommentModal';
import parse from 'html-react-parser';
import { clearpostDetail, ToggleDetailState } from '@slices/postSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import React, { useState } from 'react';
import DetailHeader from './DetailHeader';
import HeartAndMessage from './HeartAndMessage';
import SliderImages from './SliderImages';
import * as S from './style';

const DetailModal = () => {
  const [commentState, setCommentState] = useState(false);
  const postData = useAppSelector((state) => state.postSlice.postDetail);
  const dispatch = useAppDispatch();
  return (
    <>
      {postData && (
        <S.ModalWrapper>
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
                {typeof postData.content === 'string' ? parse(postData.content) : postData.content}
              </S.Content>
            </S.ContentBox>
          </S.Modal>
          <CommentModal
            commentState={commentState}
            postData={postData}
            setCommentState={setCommentState}
          />
        </S.ModalWrapper>
      )}
    </>
  );
};

export default DetailModal;
