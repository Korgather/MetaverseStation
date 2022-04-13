import React, { useState } from 'react';
import { Input, Menu } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@store/hook';
import { getSearchKeyword } from '@slices/postSlice';
const { Search } = Input;
function Category() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const category = router.query.category;

  const onSearch = () => {
    dispatch(getSearchKeyword(searchValue));
    router.push({
      pathname: '/',
      query: {
        search: searchValue,
        category,
      },
    });
  };
  const onSelect = ({ key }: { key: string }) => {
    if (key === 'category_all') {
      router.push({
        pathname: '/',
      });
    }
    if (key === 'METAVERSE_GATHERTOWN') {
      router.push({
        pathname: '/',
        query: {
          category: 'METAVERSE_GATHERTOWN',
          page: 1,
        },
      });
    }
    if (key === 'METAVERSE_ZEP') {
      router.push({
        pathname: '/',
        query: {
          category: 'METAVERSE_ZEP',
          page: 1,
        },
      });
    }
  };
  return (
    <MenuWrapper>
      <MenuBox
        onSelect={({ key }) => onSelect({ key })}
        selectedKeys={category ? [category as string] : ['category_all']}
      >
        <Menu.Item key="category_all">All</Menu.Item>
        <Menu.Item key="METAVERSE_GATHERTOWN">GatherTown</Menu.Item>
        <Menu.Item key="METAVERSE_ZEP">Zep</Menu.Item>
      </MenuBox>
      <StyledSearch onChange={searchOnChange} value={searchValue} onSearch={onSearch} />
      <BlankBox />
    </MenuWrapper>
  );
}

export default Category;

const MenuWrapper = styled.div`
  margin: 50px 0 30px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  a {
    font-size: 0.8rem;
  }
`;

const StyledSearch = styled(Search)`
  margin: 0 auto;
  width: 40%;
  min-width: 150px;
`;

const MenuBox = styled(Menu)`
  display: flex;
  margin-right: auto;
  flex-direction: row;
  width: 30%;
  border: none;
`;

const BlankBox = styled.div`
  width: 30%;
`;
