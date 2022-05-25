import React from 'react';
import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import PaginationView from './PaginationView';

const Pagination = () => {
  const router = useRouter();

  const category = router.query.category;
  const sort = router.query.sort;
  const search = router.query.search;
  const totalPages = useAppSelector((state) => state.postSlice.totalPages);
  const current = router.query.page ? (Number(router.query.page) as number) : 1;
  const onPageChange = (page: number) => {
    router.push({
      pathname: '/',
      query: { page, search, category, sort },
    });
  };
  const PaginationProps = {
    onPageChange,
    totalPages,
    current,
  };
  return <PaginationView {...PaginationProps} />;
};

export default Pagination;
