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
            <S.StyledA href={postData?.link} target="_blank">
              <S.EntnerButton type="primary">
                <div>입장하기</div>
              </S.EntnerButton>
            </S.StyledA>
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
const upDown = keyframes`
50% {
      margin-top: -20px;
    }
`;
const TestButton = styled.div`
  :before {
    content: '👇';
    font-size: 60px;
    transform: scaleX(-1);
    right: 0px;
    top: -68px;
    animation: ${upDown} 1s infinite;
  }
  .hands {
    :before,
    :after {
      content: '👇';
      font-size: 40px;
      opacity: 0;
      transition: 0.4s ease-in-out;
    }
    :before {
      transform: rotate(-60deg);
      left: -45px;
      top: -10px;
    }
    :after {
      transform: rotate(170deg);
      right: 30px;
      top: 50px;
    }
  }
  :hover .hands {
    &:before {
      opacity: 1;
      left: -35px;
    }
    :after {
      opacity: 1;
      top: 40px;
    }
  }
`;

const Hands = styled.div``;
