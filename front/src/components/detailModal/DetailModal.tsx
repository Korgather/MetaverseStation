import { IPost } from '@customTypes/post';
import parse from 'html-react-parser';
import { useMedia } from '@lib/useMedia';
import React, { SetStateAction } from 'react';
import DetailHeader from './DetailHeader';
import HeartAndMessage from './HeartAndMessage';
import SliderImages from './SliderImages';
import * as S from './style';

interface DetailModalProps {
  commentState: boolean;
  setCommentState: React.Dispatch<SetStateAction<boolean>>;
  postData: IPost;
}
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

const DetailModal = ({ commentState, setCommentState, postData }: DetailModalProps) => {
  const { isMobile, isPc, isTablet } = useMedia();

  return (
    <>
      {(isMobile || isPc || isTablet) && (
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
              {typeof postData.content === 'string' ? parse(postData.content) : postData.content}
            </S.Content>
          </S.ContentBox>
        </S.Modal>
      )}
    </>
  );
};

export default DetailModal;
