import { IComment, reply } from '@customTypes/comment';
import { useAppSelector } from '@store/hook';
import TextArea from 'antd/lib/input/TextArea';
import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from './style';
interface ReplyInputProps {
  setAmendInputState?: Dispatch<SetStateAction<boolean>>;
  reply?: reply;
  comment?: IComment;
}

const ReplyInput: React.FunctionComponent<ReplyInputProps> = ({ reply, comment }) => {
  const [amendInputState, setAmendInputState] = useState(false);
  const me = useAppSelector((state) => state.userSlice.me);
  const [replyInputState, setReplyInputState] = useState(false);
  const CloseReplyInput = () => {
    setReplyInputState(false);
  };
  const OpenReplyInput = () => {
    setReplyInputState(true);
  };
  const CloseAmendInput = () => {
    setAmendInputState(false);
  };
  const OpenAemdInput = () => {
    setAmendInputState(true);
  };
  return (
    <div>
      <S.ReplyInputWrapper>
        {comment &&
          (amendInputState ? (
            <S.ContentWrapper large>
              <S.NickName large>{comment.User?.nickname}</S.NickName>
              <S.Content large>
                <TextArea />
              </S.Content>
            </S.ContentWrapper>
          ) : (
            <S.ContentWrapper large>
              <S.NickName large>{comment.User?.nickname}</S.NickName>
              <S.Content large>{comment.content}</S.Content>
            </S.ContentWrapper>
          ))}
        {reply &&
          (amendInputState ? (
            <S.ContentWrapper>
              <S.NickName>{reply.User?.nickname}</S.NickName>
              <S.Content>
                <TextArea />
              </S.Content>
            </S.ContentWrapper>
          ) : (
            <S.ContentWrapper>
              <S.NickName>{reply.User?.nickname}</S.NickName>
              <S.Content>{reply.content}</S.Content>
            </S.ContentWrapper>
          ))}

        <S.ReplyBottom>
          <S.ReplyDate>{reply ? reply.created_at : comment ? comment.created_at : ''}</S.ReplyDate>
          <S.ReplyBtnWrapper>
            {me &&
              !amendInputState &&
              ((reply ? reply.User?.id === me.id : comment ? comment.User?.id === me.id : false) ? (
                <>
                  <S.StyledBtn onClick={OpenAemdInput}>수정</S.StyledBtn>
                  <S.StyledBtn>삭제</S.StyledBtn>
                </>
              ) : (
                <S.StyledBtn onClick={OpenReplyInput}>답글 쓰기</S.StyledBtn>
              ))}

            {me &&
              amendInputState &&
              (reply ? reply.User?.id === me.id : comment ? comment.User?.id === me.id : false) && (
                <>
                  <S.StyledBtn onClick={OpenAemdInput}>수정</S.StyledBtn>
                  <S.StyledBtn onClick={CloseAmendInput}>취소</S.StyledBtn>
                </>
              )}
          </S.ReplyBtnWrapper>
        </S.ReplyBottom>

        {replyInputState && (
          <>
            <S.StyledTextArea large={reply ? false : comment ? true : false} />
            <S.MoreRelpyBtnWrapper>
              <S.StyledBtn onClick={CloseReplyInput}>취소</S.StyledBtn>
              <S.StyledBtn>등록</S.StyledBtn>
            </S.MoreRelpyBtnWrapper>
          </>
        )}
      </S.ReplyInputWrapper>
    </div>
  );
};

export default ReplyInput;
