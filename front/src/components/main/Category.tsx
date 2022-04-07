import React, { useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
const { Search } = Input;
function Category() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSearch = () => {
    router.push(`/search/${searchValue}`);
  };
  return (
    <MenuWrapper>
      <StyledSearch onChange={searchOnChange} value={searchValue} onSearch={onSearch} />
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

const StyledSearch = styled(Search)`
  margin: 0 auto;
  width: 30%;
  min-width: 250px;
`;
