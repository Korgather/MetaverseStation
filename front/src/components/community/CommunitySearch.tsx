import React, { useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
const { Search } = Input;
function CommunitySearch() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSearch = () => {
    router.push(`/comunity/${searchValue}`);
  };
  return <StyledSearch onChange={searchOnChange} value={searchValue} onSearch={onSearch} />;
}

export default CommunitySearch;

const StyledSearch = styled(Search)`
  width: 100%;
  input {
    height: 50px;
  }
  button {
    height: 50px;
    width: 50px;
  }
`;
