import { loadComPost } from '@actions/community';
import { removeComment, updateComment } from '@actions/post';
import { IComment } from '@customTypes/comment';
import { generateBetweenTime } from '@lib/generateBetweenTime';
import { handleResizeHeight } from '@lib/textareaResizeHeight';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button } from 'antd';
import modal from 'antd/lib/modal';
import React, { useRef, useState } from 'react';
import ReplyContainer from './ReplyContainer';
import ReplyInput from './ReplyInput';
import * as S from './style';

const CommentFactory = ({ comment }: { comment: IComment }) => {
  const me = useAppSelector((state) => state.userSlice.me);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const [content, setContent] = useState(comment.content);
  const [updateState, setUpdateState] = useState(false);
  const [addReplyState, setAddReplyState] = useState(false);
  const dispatch = useAppDispatch();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  const onUpdate = async (commentId: number) => {
    const updateData = {
      content,
      commentId,
    };
    postDetail &&
      modal.confirm({
        title: '댓글을 수정하시겠습니까?',
        onOk: async function () {
          await dispatch(updateComment(updateData));
          await dispatch(loadComPost(postDetail?.id as number));
        },
      });
  };
  const onDelete = async (comment: IComment) => {
    postDetail &&
      modal.confirm({
        title: '댓글을 삭제하시겠습니까?',
        onOk: async function () {
          await dispatch(removeComment(comment as IComment));
          await dispatch(loadComPost(postDetail?.id as number));
          onToggleUpdateState();
        },
      });
  };

  const onToggleUpdateState = () => setUpdateState(!updateState);
  const onToggleAddReplyState = () => setAddReplyState(!addReplyState);
  return (
    <>
      <S.Container>
        <div>
          <S.ProfileWrapper>
            <S.ProfileImg src={comment.profileImageUrl} alt="" />
            <S.NameAndTimeWrapper>
              <S.UserName>{comment.username}</S.UserName>
              <S.Time>{generateBetweenTime(comment)}</S.Time>
            </S.NameAndTimeWrapper>
            {comment.userId === me?.userId && (
              <S.ButtonWrapper>
                <div onClick={() => onToggleUpdateState()}>수정</div>
                <div onClick={() => onDelete(comment)}>삭제</div>
              </S.ButtonWrapper>
            )}
          </S.ProfileWrapper>
          {updateState ? (
            <S.UpdateWrapper>
              <S.StyledTextArea
                onInput={() => handleResizeHeight(textRef)}
                ref={textRef}
                value={content}
                onChange={onChange}
                spellCheck="false"
              />
              <S.UpdateBox>
                <Button size="small" onClick={() => onUpdate(comment.commentId as number)}>
                  수정
                </Button>
                <Button size="small" onClick={() => onToggleUpdateState()}>
                  취소
                </Button>
              </S.UpdateBox>
            </S.UpdateWrapper>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <S.Content>{comment.content}</S.Content>
              <S.ButtonWrapper reply="true">
                <div onClick={() => onToggleAddReplyState()}>
                  {addReplyState ? '취소' : '답글쓰기'}
                </div>
              </S.ButtonWrapper>
            </div>
          )}
        </div>
      </S.Container>
      {addReplyState && <ReplyInput comment={comment} />}
      {comment.postCommentReplyList.map((reply) => (
        <ReplyContainer reply={reply} key={reply.id} />
      ))}
    </>
  );
};

export default CommentFactory;
