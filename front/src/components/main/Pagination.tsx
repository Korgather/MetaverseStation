import React from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { getPageNum, getSearchPageNum } from '@slices/postSlice';
import { useRouter } from 'next/router';
import { searchPosts } from '@actions/post';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const category =
    router.pathname.indexOf('gathertown') > -1
      ? 'METAVERSE_GATHERTOWN'
      : router.pathname.indexOf('zep') > -1
      ? 'METAVERSE_ZEP'
      : 'METAVERSE';
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
