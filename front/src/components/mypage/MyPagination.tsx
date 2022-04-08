import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { getlikedPostPageNum, getmyPostPageNum } from '@slices/userSlice';
import { loadLikedPosts, loadMyPosts } from '@actions/user';
import { useRouter } from 'next/router';

interface MyPaginationProps {
  myLikedPostsState: boolean;
}

const MyPagination = ({ myLikedPostsState }: MyPaginationProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const author = useAppSelector((state) => state.userSlice.authorInfo);
  const pathname = author ? `/user/${author.userId}` : '/mypage';
  const me = useAppSelector((state) => state.userSlice.me);
  const category = router.query.category ? router.query.category : 'METAVERSE';
  const userTotalPages = useAppSelector((state) => state.userSlice.myPostTotalPages);
  const onPageChange = (page: number) => {
    router.push({
      pathname: pathname,
      query: {
        page,
        category,
        profileImageUrl: author && author.profileImageUrl,
        userId: author ? author.userId : me?.userId,
        username: author && author?.username,
      },
    });
  };
  return (
    <PaginationWrapper>
      <AntdPagination
        size="small"
        responsive={true}
        pageSizeOptions={[10, 20, 50, 100]}
        onChange={onPageChange}
        defaultPageSize={6}
        total={userTotalPages * 5}
        current={router.query.page ? (Number(router.query.page) as number) : 1}
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
