import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import SearchInput from './SearchInput';

function Category() {
  const router = useRouter();
  const [sort, setSort] = useState('');
  const onFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.currentTarget as HTMLButtonElement).name;
    name && setSort(name);
    router.push({
      pathname: '/',
      query: {
        category: router.query.category,
        page: 1,
        sort: name === 'sortByDate' ? '' : name === 'sortByPlayer' && 'playerCount,desc',
      },
    });
  };
  const category = router.query.category;
  useEffect(() => {
    router.query.sort === 'playerCount,desc' ? setSort('sortByPlayer') : setSort('sortByDate');
  }, [router.query.sort]);
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
          sort: '',
        },
      });
    }
    if (key === 'METAVERSE_ZEP') {
      router.push({
        pathname: '/',
        query: {
          category: 'METAVERSE_ZEP',
          page: 1,
          sort: '',
        },
      });
    }
  };
  return (
    <MenuWrapper>
      <MenuFilterWrapper>
        <MenuBox
          onSelect={({ key }) => onSelect({ key })}
          selectedKeys={category ? [category as string] : ['category_all']}
        >
          <Menu.Item key="category_all">All</Menu.Item>
          <Menu.Item key="METAVERSE_GATHERTOWN">GatherTown</Menu.Item>
          <Menu.Item key="METAVERSE_ZEP">Zep</Menu.Item>
        </MenuBox>
        <FilterWrapper>
          <FilterInner>
            <FilterBox sortByDate={sort} name="sortByDate" onClick={onFilter}>
              <Circle>·</Circle> <div>최신순</div>
            </FilterBox>
            <FilterBox sortByPlayer={sort} name="sortByPlayer" onClick={onFilter}>
              <Circle>·</Circle> <div>접속자순</div>
            </FilterBox>
          </FilterInner>
        </FilterWrapper>
      </MenuFilterWrapper>
      <SearchInput category={category as string} />
      <BlankBox />
    </MenuWrapper>
  );
}

export default Category;
interface sort {
  sortByDate?: string;
  sortByPlayer?: string;
}

const MenuWrapper = styled.div`
  margin: 20px 0 30px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  a {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 850px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0 30px 0;
  }
`;

const MenuBox = styled(Menu)`
  display: flex;
  margin-right: auto;
  flex-direction: row;
  border: none;
  @media screen and (max-width: 850px) {
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
`;
const Circle = styled.span`
  font-size: 2rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 850px) {
    justify-content: center;
  }
  button {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const FilterInner = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.3%;
  @media screen and (max-width: 850px) {
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

const BlankBox = styled.div`
  width: 33.3%;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const FilterBox = styled.button<sort>`
  + button {
    margin-left: 20px;
  }
  color: #acb0b4;
  font-weight: 600;
  cursor: pointer;
  ${(props) =>
    (props.sortByDate === 'sortByDate' || props.sortByPlayer === 'sortByPlayer') &&
    css`
      color: #099dfe;
    `}

  :hover {
    color: #099cfed2;
  }
  transition: color 0.3 ease-in;
  background: inherit;
  border: none;
  display: blox;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
`;
