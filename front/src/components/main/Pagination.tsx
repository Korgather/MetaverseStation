import React from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { getPageNum } from '@slices/postSlice';
import Router from 'next/router';

const Pagination = ({ pageNum }: { pageNum?: string }) => {
  const dispatch = useAppDispatch();
  const totalPages = useAppSelector((state) => state.postSlice.totalPages);
  const onPageChange = (page: number) => {
    if (page === 1) {
      return Router.push('/');
    }
    Router.push(`/${page}`);
    dispatch(getPageNum(page - 1));
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
        current={pageNum ? Number(pageNum) : 1}
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
