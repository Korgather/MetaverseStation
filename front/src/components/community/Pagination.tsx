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
  const onPageChange = (page: number) => {
    router.push(`/community/${category}/${page}`);
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
        current={Number(router.query.id) as number}
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
`;
