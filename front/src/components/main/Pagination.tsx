import React from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { getPageNum, getSearchPageNum } from '@slices/postSlice';
import { useRouter } from 'next/router';
import { searchPosts } from '@actions/post';

const Pagination = ({ pageNum }: { pageNum?: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchState = router.pathname.indexOf('search') > -1;
  const searchPageNum = useAppSelector((state) => state.postSlice.searchPageNum);
  const searchTotalPages = useAppSelector((state) => state.postSlice.searchTotalPages);
  console.log(searchState);
  const totalPages = useAppSelector((state) => state.postSlice.totalPages);
  const onPageChange = (page: number) => {
    if (searchState) {
      dispatch(getSearchPageNum(page));
      dispatch(searchPosts());
    } else {
      if (page === 1) {
        return router.push('/');
      } else {
        router.push(`/${page}`);
        dispatch(getPageNum(page - 1));
      }
    }
  };
  return (
    <PaginationWrapper>
      {searchState ? (
        <AntdPagination
          size="small"
          responsive={true}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={onPageChange}
          defaultPageSize={8}
          total={searchTotalPages * 8}
          current={searchPageNum ? Number(searchPageNum) : 1}
        />
      ) : (
        <AntdPagination
          size="small"
          responsive={true}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={onPageChange}
          defaultPageSize={8}
          total={totalPages * 8}
          current={pageNum ? Number(pageNum) : 1}
        />
      )}
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
