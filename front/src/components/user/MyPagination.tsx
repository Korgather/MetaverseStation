import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { getAuthorPostPageNum, getlikedPostPageNum, getmyPostPageNum } from '@slices/userSlice';
import { loadAuthorLikedPosts, loadAuthorPosts, loadLikedPosts, loadMyPosts } from '@actions/user';

interface MyPaginationProps {
  authorLikedPostsState: boolean;
}

const MyPagination = ({ authorLikedPostsState }: MyPaginationProps) => {
  const dispatch = useAppDispatch();
  const authorInfo = useAppSelector((state) => state.userSlice.authorInfo);
  const likedPostPageNum = useAppSelector((state) => state.userSlice.likedPostPageNum);
  const likedPostTotalPages = useAppSelector((state) => state.userSlice.likedPostTotalPages);
  const myPostPageNum = useAppSelector((state) => state.userSlice.myPostPageNum);
  const myPostTotalPages = useAppSelector((state) => state.userSlice.myPostTotalPages);
  const onPageChange = (page: number) => {
    if (authorLikedPostsState) {
      dispatch(getAutholikedPostPageNum(page));
      dispatch(loadAuthorLikedPosts(authorInfo?.userId as number));
    } else {
      dispatch(getAuthorPostPageNum(page));
      dispatch(loadAuthorPosts(authorInfo?.userId as number));
    }
  };
  return (
    <PaginationWrapper>
      <AntdPagination
        size="small"
        responsive={true}
        pageSizeOptions={[10, 20, 50, 100]}
        onChange={onPageChange}
        defaultPageSize={8}
        total={authorLikedPostsState ? likedPostTotalPages * 8 : myPostTotalPages * 8}
        current={authorLikedPostsState ? likedPostPageNum : myPostPageNum}
      />
    </PaginationWrapper>
  );
};

export default MyPagination;

const PaginationWrapper = styled.div`
  width: 1440px;
  text-align: center;
  padding-top: 50px;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
`;
function getAutholikedPostPageNum(page: number): any {
  throw new Error('Function not implemented.');
}
