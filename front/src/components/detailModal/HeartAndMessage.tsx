import { heartPost, loadPost } from '@actions/post';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@store/hook';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as S from './style';
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
    setLikeState(!likeState);
    if (postDetail?.id) {
      await dispatch(heartPost(postDetail.id));
      await dispatch(loadPost(postDetail.id));
    }
  };

  const onToggleComment = () => {
    setCommentState(!commentState);
  };

  return (
    <S.HeartAndMessageWrapper>
      {likeState ? (
        <HeartFilled onClick={onToggleLike} style={{ fontSize: '1.3rem', color: '#eb3f96' }} />
      ) : (
        <HeartOutlined onClick={onToggleLike} style={{ fontSize: '1.3rem', color: '#eb3f96' }} />
      )}
      <S.StyledSpan>
        {Object.keys(postDetail?.likeUserList as object).length}명이 좋아합니다.
      </S.StyledSpan>
      {commentState ? (
        <S.CommentImg onClick={onToggleComment} src="images/activeCommentIcon.png" />
      ) : (
        <S.CommentImg onClick={onToggleComment} src="images/commentIcon.png" />
      )}
    </S.HeartAndMessageWrapper>
  );
};

export default HeartAndMessage;
