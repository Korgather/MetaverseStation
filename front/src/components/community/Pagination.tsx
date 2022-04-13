import React from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';

const Pagination = () => {
  const router = useRouter();
  const category =
    router.pathname.indexOf('question') > -1
      ? 'question'
      : router.pathname.indexOf('study') > -1
      ? 'study'
      : router.pathname.indexOf('free') > -1 && 'free';
  const comTotalPages = useAppSelector((state) => state.communitySlice.comTotalPages);
  const search = router.query.search;
  const onPageChange = (page: number) => {
    router.push({
      pathname: `/community/${category}`,
      query: {
        page,
        search,
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
        defaultPageSize={5}
        total={comTotalPages * 5}
        current={router.query.page ? (Number(router.query.page) as number) : 1}
      />
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  width: 1440px;
  text-align: center;
  margin-bottom: 40px;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  @media screen and (max-width: 850px) {
    margin-top: 20px;
    width: 100vw;
  }
`;
