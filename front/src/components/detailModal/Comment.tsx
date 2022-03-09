import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import { dummy } from './dummy.json';
import Reply from './Reply';

const Comment = () => {
  const userId = '1';

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
              <CommentBottom>
                <CommentDate>{comment.date}</CommentDate>
                <CommentBtnWrapper>
                  {comment.userId === userId ? (
                    <StyledBtn>답글 쓰기</StyledBtn>
                  ) : (
                    <>
                      <StyledBtn>수정</StyledBtn>
                      <StyledBtn>삭제</StyledBtn>
                    </>
                  )}
                </CommentBtnWrapper>
              </CommentBottom>
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

const CommentBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentDate = styled.div`
  color: #abb0b5;
  font-size: 0.7rem;
`;

const CommentBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledBtn = styled.div`
  color: #abb0b5;
  font-size: 0.7rem;
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
