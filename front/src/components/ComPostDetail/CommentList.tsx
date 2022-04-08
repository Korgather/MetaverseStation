import { useAppSelector } from '@store/hook';
import React from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import CommentFactory from './CommentFactory';

const CommentList = () => {
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);

  return postDetail ? (
    <CommentListLayout>
      {postDetail.postCommentList.map((comment) => (
        <CommentFactory key={shortid.generate()} comment={comment} />
      ))}
    </CommentListLayout>
  ) : (
    <div>로딩중</div>
  );
};

export default CommentList;

const CommentListLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  max-width: 600px;
`;
