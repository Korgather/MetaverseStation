import SearchInput from '@components/common/SearchInput/SearchInput';
import { media } from '@styles/theme';
import { Menu } from 'antd';
import React from 'react';
import styled, { css } from 'styled-components';

export interface ICategoryView {
  selectedKeys: string[];
  onSelect: ({ key }: { key: string }) => void;
  sort: string;
  onFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  category: string;
}

const CategoryView = ({ selectedKeys, onSelect, sort, onFilter, category }: ICategoryView) => {
  return (
    <MenuWrapper>
      <MenuFilterWrapper>
        <MenuBox onSelect={onSelect} selectedKeys={selectedKeys}>
          <Menu.Item key="category_all">All</Menu.Item>
          <Menu.Item key="METAVERSE_GATHERTOWN">GatherTown</Menu.Item>
          <Menu.Item key="METAVERSE_ZEP">Zep</Menu.Item>
          <Menu.Item key="METAVERSE_2NDBLOCK">2ndBlock</Menu.Item>
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
      <SearchInput
        category={category}
        pathname="/"
        placeholder="메타버스 검색하기"
        noOptionsMessage="일치하는 메타버스가 없습니다"
      />
      <BlankBox />
    </MenuWrapper>
  );
};

export default CategoryView;

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
  ${media.mobile} {
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
  ${media.mobile} {
    margin: 0 auto;
    width: 100%;
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

  ${media.mobile} {
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
  ${media.mobile} {
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

const BlankBox = styled.div`
  width: 33.3%;
  ${media.mobile} {
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
