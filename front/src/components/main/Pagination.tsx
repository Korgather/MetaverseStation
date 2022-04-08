import React from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';

const Pagination = () => {
  const router = useRouter();

  const category = router.query.category;

  const search = useAppSelector((state) => state.postSlice.searchKeyword);
  const totalPages = useAppSelector((state) => state.postSlice.totalPages);
  const onPageChange = (page: number) => {
    router.push({
      pathname: '/',
      query: { page, search, category },
    });
  };
  return (
    <PaginationWrapper>
      <AntdPagination
        size="small"
        responsive={true}
        pageSizeOptions={[10, 20, 50, 100]}
        onChange={onPageChange}
        defaultPageSize={8}
        total={totalPages * 8}
        current={router.query.page ? (Number(router.query.page) as number) : 1}
      />
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  width: 1440px;
  text-align: center;
  padding-top: 50px;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
`;
