import { heartPost, loadPost } from '@actions/post';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { IPost } from '@customTypes/post';
import { kakaoShare } from '@lib/kakaoShare';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { message } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Heart from './Heart';
import * as S from './style';

const heartVariants = {
  initial: {
    scale: 1,
  },
  visible: {
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.4 },
  },
  leaving: {
    scale: 1.3,
    transition: { duration: 0.2 },
  },
};
interface HeartAndMessage {
  setCommentState: Dispatch<SetStateAction<boolean>>;
  commentState: boolean;
}

const HeartAndMessage: React.FunctionComponent<HeartAndMessage> = ({
  commentState,
  setCommentState,
}) => {
  const [likeState, setLikeState] = useState(false);

  const dispatch = useAppDispatch();
  const postDetail = useAppSelector((state) => state.postSlice.postDetail);
  const me = useAppSelector((state) => state.userSlice.me);
  useEffect(() => {
    me && Object.keys(postDetail?.likeUserList as object).indexOf(me?.userId.toString()) > -1
      ? setLikeState(true)
      : setLikeState(false);
  }, []);

  const onToggleLike = async () => {
    if (me) {
      setLikeState(!likeState);
      if (postDetail?.id) {
        await dispatch(heartPost(postDetail.id));
        await dispatch(loadPost(postDetail.id));
      }
    } else {
      message.info({
        content: '로그인이 필요합니다.',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  const onToggleComment = () => {
    setCommentState(!commentState);
  };

  return (
    <S.HeartAndMessageWrapper>
      <AnimatePresence>
        {likeState ? (
          <Heart onToggleLike={onToggleLike} fill="true" />
        ) : (
          <Heart onToggleLike={onToggleLike} fill="false" />
        )}
      </AnimatePresence>
      <S.StyledSpan>
        {Object.keys(postDetail?.likeUserList as object).length}명이 좋아합니다.
      </S.StyledSpan>
      <S.RightWrapper>
        <S.StyledShareIcon
          src="../../images/share.png"
          onClick={() => kakaoShare(postDetail as IPost)}
        />
        {commentState ? (
          <S.CommentImg onClick={onToggleComment} src="../../images/activeCommentIcon.png" />
        ) : (
          <S.CommentImg onClick={onToggleComment} src="../../images/commentIcon.png" />
        )}
      </S.RightWrapper>
    </S.HeartAndMessageWrapper>
  );
};

export default HeartAndMessage;
