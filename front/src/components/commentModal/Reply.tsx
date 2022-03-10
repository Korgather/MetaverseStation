import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import ReplyInput from './ReplyInput';

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
          <>
            <ReplyContainer key={shortid.generate()}>
              <PromfileImg src={reply.profile} />
              <ContentAndBottomWrapper>
                <ContentWrapper>
                  <NickName>{reply.nickname}</NickName>
                  <Content>{reply.content}</Content>
                </ContentWrapper>
                <ReplyInput reply={reply} />
              </ContentAndBottomWrapper>
            </ReplyContainer>
          </>
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
  + div {
    margin-top: 10px;
  }
`;

const PromfileImg = styled.img`
  width: 35px;
  height: 35px;
`;

const ReplyContainer = styled.div<ReplyContainer>`
  display: flex;
  flex-direction: row;
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
