import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import * as S from './style';

interface PaginationViewProps {
  onPageChange: (page: number) => void;
  totalPages: number;
  current: number;
}

const PaginationView = ({ onPageChange, totalPages, current }: PaginationViewProps) => {
  return (
    <S.PaginationWrapper>
      <AntdPagination
        size="small"
        responsive={true}
        pageSizeOptions={[10, 20, 50, 100]}
        onChange={onPageChange}
        defaultPageSize={8}
        total={totalPages * 8}
        current={current}
      />
    </S.PaginationWrapper>
  );
};

export default PaginationView;
