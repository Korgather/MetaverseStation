import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { getlikedPostPageNum, getmyPostPageNum } from '@slices/userSlice';
import { loadLikedPosts, loadMyPosts } from '@actions/user';

interface MyPaginationProps {
  myLikedPostsState: boolean;
}

const MyPagination = ({ myLikedPostsState }: MyPaginationProps) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.userSlice.me);
  const likedPostPageNum = useAppSelector((state) => state.userSlice.likedPostPageNum);
  const likedPostTotalPages = useAppSelector((state) => state.userSlice.likedPostTotalPages);
  const myPostPageNum = useAppSelector((state) => state.userSlice.myPostPageNum);
  const myPostTotalPages = useAppSelector((state) => state.userSlice.myPostTotalPages);
  const onPageChange = (page: number) => {
    if (myLikedPostsState) {
      dispatch(getlikedPostPageNum(page));
      dispatch(loadLikedPosts(me?.userId as number));
    } else {
      dispatch(getmyPostPageNum(page));
      dispatch(loadMyPosts(me?.userId as number));
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
        total={myLikedPostsState ? likedPostTotalPages * 8 : myPostTotalPages * 8}
        current={myLikedPostsState ? likedPostPageNum : myPostPageNum}
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
