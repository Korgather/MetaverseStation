import React from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';
type Props = {};

const Pagination = (props: Props) => {
  return (
    <PaginationWrapper>
      <AntdPagination size="small" responsive={true} pageSizeOptions={[10, 20, 50, 100]} total={50} />
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  width: 75vw;
  text-align: center;
  padding-top: 50px;
`;
