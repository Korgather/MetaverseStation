import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import { dummy } from './dummy.json';
import Reply from './Reply';
import ReplyInput from './ReplyInput';

const Comment = () => {
  return (
    <CommentWrapper>
      {dummy.map((comment, idx) => (
        <>
          <CommentContainer key={shortid.generate()}>
            <PromfileImg src={comment.profile} />
            <ContentAndBottomWrapper>
              <ContentWrapper>
                <NickName>{comment.nickname}</NickName>
                <Content>{comment.content}</Content>
              </ContentWrapper>
              <ReplyInput comment={comment} />
            </ContentAndBottomWrapper>
          </CommentContainer>
          <Reply comment={comment} />
        </>
      ))}
    </CommentWrapper>
  );
};

export default Comment;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const PromfileImg = styled.img`
  width: 40px;
  height: 40px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  + div {
    margin-top: 10px;
  }
`;

const Content = styled.div`
  font-size: 0.75rem;
`;

const NickName = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f1f3f5;
  border-radius: 5px;
  padding: 10px;
  width: 14vw;
  max-width: 260px;
`;

const ContentAndBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
