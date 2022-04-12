import React, { useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@store/hook';
import { getSearchInput } from '@slices/communitySlice';
const { Search } = Input;
function CommunitySearch() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const category =
    router.pathname.indexOf('question') > -1
      ? 'question'
      : router.pathname.indexOf('study') > -1
      ? 'study'
      : router.pathname.indexOf('free') > -1 && 'free';
  const onSearch = () => {
    dispatch(getSearchInput(searchValue));
    router.push({
      pathname: `/community/${category}`,
      query: {
        search: searchValue,
      },
    });
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
