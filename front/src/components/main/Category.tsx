import React, { useState } from 'react';
import { Menu, Dropdown, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import shortid from 'shortid';
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
  const onSearch = () => {
    router.push(`/search/${searchValue}`);
  };
  const menu = (
    <Menu>
      <Menu.Item key={shortid.generate()}>
        <a>최신순</a>
      </Menu.Item>
      <Menu.Item key={shortid.generate()}>
        <a>인기순</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <MenuWrapper>
      <StyledSearch onChange={searchOnChange} value={searchValue} onSearch={onSearch} />
      {/* <DropdownWrapper overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          최신순 <DownOutlined />
        </a>
      </DropdownWrapper> */}
    </MenuWrapper>
  );
}

export default Category;

const MenuWrapper = styled.div`
  margin: 50px 0 30px 0;
  display: flex;
  flex-direction: row;
  position: relative;
  a {
    font-size: 0.8rem;
  }
`;

const DropdownWrapper = styled(Dropdown)``;

const StyledSearch = styled(Search)`
  margin: 0 auto;
  width: 30%;
  min-width: 250px;
`;
