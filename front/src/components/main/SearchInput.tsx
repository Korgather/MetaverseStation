import { searchKeywords } from '@actions/post';
import { IPost } from '@customTypes/post';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
interface ISelectOption {
  value: string;
  label: string;
}
interface ISearchInput {
  category: string;
}
const SearchInput = ({ category }: ISearchInput) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchLoading = useAppSelector((state) => state.postSlice.searchKeywordsLoading);
  const [searchValue, setSearchValue] = useState('');
  const [postList, setPostList] = useState<ISelectOption[]>([]);
  const onSearchInputChange = (newValue: string) => {
    setSearchValue(newValue);
  };
  const onSearch = (newValue: ISelectOption | unknown) => {
    const search = (newValue as ISelectOption).value;
    setSearchValue('');
    router.push({
      pathname: '/',
      query: {
        category,
        search,
      },
    });
  };
  const search = async () => {
    if (searchValue.length >= 1) {
      const res = await dispatch(searchKeywords({ searchValue, category }));
      const dataForSelect = res.payload.content.map((el: IPost) => ({
        value: el.title,
        label: el.title,
      }));
      setPostList(dataForSelect);
    } else {
      setPostList([]);
    }
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      return search();
    }, 1000);
    return () => clearTimeout(debounce);
  }, [searchValue]);
  return (
    <>
      <input type="text" style={{ display: 'none' }} />
      <StyledSelect
        placeholder="찾으시는 메타버스를 검색해보세요."
        onChange={onSearch}
        options={postList}
        onInputChange={onSearchInputChange}
        inputValue={searchValue}
        noOptionsMessage={() => (searchLoading ? 'Loading...' : '일치하는 메타버스가 없습니다.')}
        theme={(theme: any) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#83c5fade',
          },
        })}
      />
    </>
  );
};

export default SearchInput;

const StyledSelect = styled(Select)`
  margin: auto auto;
  width: 33.3%;
  min-width: 150px;
  min-height: 30px;
  .react-select-container {
    :hover {
      border-color: #40a9ff !important;
    }
    :focus {
      outline: #40a9ff !important;
      border-color: #40a9ff !important;
    }
  }
`;
