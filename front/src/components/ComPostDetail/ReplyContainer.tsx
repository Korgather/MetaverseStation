import { loadComPost } from '@actions/community';
import { removeReply, updateReply } from '@actions/post';
import { IReply } from '@customTypes/comment';
import { generateBetweenTime } from '@lib/generateBetweenTime';
import { handleResizeHeight } from '@lib/textareaResizeHeight';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button } from 'antd';
import modal from 'antd/lib/modal';
import React, { useRef, useState } from 'react';
import ReplyInput from './ReplyInput';
import * as S from './style';
const ReplyContainer = ({ reply }: { reply: IReply }) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.userSlice.me);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const [updateState, setUpdateState] = useState(false);
  const [content, setContent] = useState(reply.content);
  const [addReplyState, setAddReplyState] = useState(false);

  const onToggleUpdateState = () => setUpdateState(!updateState);
  const onToggleAddReplyState = () => setAddReplyState(!addReplyState);

  const onDelete = async (reply: IReply) => {
    postDetail &&
      modal.confirm({
        title: '답글을 삭제하시겠습니까?',
        onOk: async function () {
          await dispatch(removeReply(reply.replyId as number));
          await dispatch(loadComPost(postDetail?.id as number));
          onToggleUpdateState();
        },
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  const onUpdate = async (replyId: number) => {
    const updateData = {
      content,
      replyId,
    };
    postDetail &&
      modal.confirm({
        title: '답글을 수정하시겠습니까?',
        onOk: async function () {
          await dispatch(updateReply(updateData));
          await dispatch(loadComPost(postDetail?.id as number));
        },
      });
  };
  return (
    <S.ReplyContainerLayout>
      <S.Wrapper>
        <S.ProfileWrapper>
          <S.ProfileImg src={reply.profileImageUrl} alt="" />
          <S.NameAndTimeWrapper>
            <S.UserName>{reply.username}</S.UserName>
            <S.Time>{generateBetweenTime(reply)}</S.Time>
          </S.NameAndTimeWrapper>
          {reply.userId === me?.userId && (
            <S.ButtonWrapper>
              <div onClick={() => onToggleUpdateState()}>수정</div>
              <div onClick={() => onDelete(reply)}>삭제</div>
            </S.ButtonWrapper>
          )}
        </S.ProfileWrapper>
        {updateState && (
          <S.UpdateWrapper>
            <S.StyledTextArea
              value={content}
              onChange={onChange}
              ref={textRef}
              onInput={() => handleResizeHeight(textRef)}
              spellCheck="false"
            />
            <S.UpdateBox>
              <Button size="small" onClick={() => onUpdate(reply.replyId as number)}>
                수정
              </Button>
              <Button size="small" onClick={() => onToggleUpdateState()}>
                취소
              </Button>
            </S.UpdateBox>
          </S.UpdateWrapper>
        )}

        {!updateState && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <S.Content>{reply.content}</S.Content>
            <S.ButtonWrapper reply="true">
              <div onClick={() => onToggleAddReplyState()}>
                {addReplyState ? '취소' : '답글쓰기'}
              </div>
            </S.ButtonWrapper>
          </div>
        )}

        {addReplyState && <ReplyInput reply={reply} />}
      </S.Wrapper>
    </S.ReplyContainerLayout>
  );
};

export default ReplyContainer;
