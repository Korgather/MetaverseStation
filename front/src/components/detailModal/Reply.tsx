import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import { dummy as dum } from './dummy.json';

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

const Reply = ({ comment }: { comment: comment }) => {
  const userId = '1';
  const [moreCommentView, setMoreCommentView] = useState(false);

  const ToggleMoreCommentView = () => {
    setMoreCommentView(true);
  };
  return (
    <ReplyWrapper>
      {comment.reply && !moreCommentView && comment.reply.length >= 2 ? (
        <>
          <ReplyContainer small={true} key={shortid.generate()}>
            <PromfileImg src={comment.reply[0].profile} />
            <ContentAndBottomWrapper>
              <ContentWrapper>
                <Content>
                  {comment.reply[0].content && comment.reply[0].content.length >= 19
                    ? `${comment.reply[0].content?.slice(0, 18)}...`
                    : comment.reply[0].content}
                </Content>
              </ContentWrapper>
            </ContentAndBottomWrapper>
          </ReplyContainer>
          <MoreViewBtn onClick={ToggleMoreCommentView}>답글 {comment.reply.length - 1}개 더 보기...</MoreViewBtn>
        </>
      ) : (
        comment.reply &&
        comment.reply.map((reply) => (
          <ReplyContainer key={shortid.generate()}>
            <PromfileImg src={reply.profile} />
            <ContentAndBottomWrapper>
              <ContentWrapper>
                <NickName>{reply.nickname}</NickName>
                <Content>{reply.content}</Content>
              </ContentWrapper>
              <ReplyBottom>
                <ReplyDate>{reply.date}</ReplyDate>
                <ReplyBtnWrapper>
                  {reply.userId === userId ? (
                    <StyledBtn>답글 쓰기</StyledBtn>
                  ) : (
                    <>
                      <StyledBtn>수정</StyledBtn>
                      <StyledBtn>삭제</StyledBtn>
                    </>
                  )}
                </ReplyBtnWrapper>
              </ReplyBottom>
            </ContentAndBottomWrapper>
          </ReplyContainer>
        ))
      )}
    </ReplyWrapper>
  );
};

export default Reply;

interface ReplyContainer {
  small?: boolean;
}

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const PromfileImg = styled.img`
  width: 35px;
  height: 35px;
`;

const ReplyContainer = styled.div<ReplyContainer>`
  display: flex;
  flex-direction: row;
  + div {
    margin-top: 10px;
  }
  margin-left: auto;
`;

const Content = styled.div`
  font-size: 0.7rem;
`;

const NickName = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f1f3f5;
  border-radius: 5px;
  padding: 10px;
  width: 11vw;
  max-width: 210px;
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

const ContentAndBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const MoreViewBtn = styled.div`
  font-size: 0.7rem;
  margin-left: auto;
  margin-top: 0 !important;
  color: #abb0b5;
  cursor: pointer;
  :hover {
    color: #1890ff;
  }
  padding-bottom: 5px;
`;
