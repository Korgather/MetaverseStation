import { searchKeywords } from '@actions/post';
import { IPost } from '@customTypes/post';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const defaultStyleConfig = {
  pcWidth: '33.3%',
  mobileWidth: '70%',
  height: '30px',
};
interface styleConfig {
  pcWidth?: string;
  mobileWidth?: string;
  height?: string;
}
interface ISelectOption {
  value: string;
  label: string;
}
interface ISearchInputProps {
  category: string;
  styleConfig?: styleConfig;
  pathname: string;
  placeholder?: string;
  noOptionsMessage?: string;
}
const SearchInput = ({
  pathname,
  category,
  styleConfig = defaultStyleConfig,
  placeholder = '',
  noOptionsMessage = '게시물이 존재하지 않습니다.',
}: ISearchInputProps) => {
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
      pathname,
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
    <Container {...styleConfig}>
      <input type="text" style={{ display: 'none' }} />
      <StyledSelect
        styles={{ control: (provided) => ({ ...provided, height: styleConfig.height }) }}
        placeholder={placeholder}
        onChange={onSearch}
        options={postList}
        onInputChange={onSearchInputChange}
        inputValue={searchValue}
        noOptionsMessage={() => (searchLoading ? 'Loading...' : noOptionsMessage)}
        theme={(theme: any) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#83c5fade',
          },
        })}
      />
    </Container>
  );
};

export default SearchInput;
const Container = styled.div<styleConfig>`
  margin: auto auto;
  width: ${(props) => props.pcWidth};
  min-width: 150px;
  min-height: 30px;
  @media screen and (max-width: 850px) {
    width: ${(props) => props.mobileWidth};
  }
  .css-1s2u09g-control {
    height: ${(props) => props.height};
  }
`;

const StyledSelect = styled(Select)`
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
