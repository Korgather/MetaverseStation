import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

type reply = {
  userId?: string;
  profile?: string;
  nickname?: string;
  date?: string;
  content?: string;
};

interface comment {
  userId: string;
  profile: string;
  nickname: string;
  date: string;
  content: string;
  reply?: reply[];
}

const ReplyInput = ({ reply, comment }: { reply?: reply; comment?: comment }) => {
  const userId = '1';
  const [replyInputState, setReplyInputState] = useState(false);
  const CloseReplyInput = () => {
    setReplyInputState(false);
  };

  const OpenReplyInput = () => {
    setReplyInputState(true);
  };
  return (
    <div>
      <ReplyInputWrapper>
        <ReplyBottom>
          <ReplyDate>{reply ? reply.date : comment ? comment.date : ''}</ReplyDate>
          <ReplyBtnWrapper>
            {(reply ? reply.userId === userId : comment ? comment.userId === userId : false) ? (
              <StyledBtn onClick={OpenReplyInput}>답글 쓰기</StyledBtn>
            ) : (
              <>
                <StyledBtn>수정</StyledBtn>
                <StyledBtn>삭제</StyledBtn>
              </>
            )}
          </ReplyBtnWrapper>
        </ReplyBottom>
        {replyInputState && (
          <>
            <StyledTextArea large={reply ? false : comment ? true : false} />
            <MoreRelpyBtnWrapper>
              <StyledBtn onClick={CloseReplyInput}>취소</StyledBtn>
              <StyledBtn>등록</StyledBtn>
            </MoreRelpyBtnWrapper>
          </>
        )}
      </ReplyInputWrapper>
    </div>
  );
};

export default ReplyInput;

interface StyledTextArea {
  large?: boolean;
}

const ReplyInputWrapper = styled.div``;
const StyledTextArea = styled(TextArea)<StyledTextArea>`
  position: relative;
  width: 11vw;
  max-width: 210px !important;
  margin-left: auto;
  ${(props) =>
    props.large &&
    css`
      width: 13.5vw;
      max-width: 260px !important;
    `}
`;

const StyledBtn = styled.div`
  color: #abb0b5;
  font-size: 0.6rem;
  margin-right: 5px;
  cursor: pointer;
  :hover {
    color: #1890ff;
  }
  + div {
    margin-left: 5px;
  }
`;

const MoreRelpyBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  justify-content: flex-end;
`;

const ReplyBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ReplyDate = styled.div`
  color: #abb0b5;
  font-size: 0.6rem;
`;

const ReplyBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
