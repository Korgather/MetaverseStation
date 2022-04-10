import React from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';

const MyPagination = () => {
  const router = useRouter();
  const author = useAppSelector((state) => state.userSlice.authorInfo);
  const pathname = author ? `/user/${author.userId}` : '/mypage';
  const me = useAppSelector((state) => state.userSlice.me);
  const category = router.query.category ? router.query.category : 'METAVERSE';
  const userTotalPages = useAppSelector((state) => state.userSlice.myPostTotalPages);
  const filter = router.query.filter;
  const onPageChange = (page: number) => {
    router.push({
      pathname: pathname,
      query: {
        page,
        category,
        profileImageUrl: author && author.profileImageUrl,
        userId: author ? author.userId : me?.userId,
        username: author && author?.username,
        filter,
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
        total={userTotalPages * 6}
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
