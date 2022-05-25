import SearchInput from '@components/common/SearchInput';
import { ToggleCommunityWriteModalState } from '@slices/communitySlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { media } from '@styles/theme';
import styled from 'styled-components';
import BoardList from './BoardList';
import Category from './Category';
import CommunitySearch from './CommunitySearch';

const Board = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const openModal = () => dispatch(ToggleCommunityWriteModalState(true));
  const me = useAppSelector((state) => state.userSlice.me);
  const pathname =
    router.pathname.indexOf('question') > -1
      ? 'question'
      : router.pathname.indexOf('study') > -1
      ? 'study'
      : router.pathname.indexOf('free') > -1 && 'free';
  const category =
    pathname === 'question'
      ? 'COMMUNITY_QUESTION'
      : pathname === 'study'
      ? 'COMMUNITY_STUDY'
      : pathname === 'free' && 'COMMUNITY_GENERAL';
  return (
    <Layout>
      <CategoryWrapper>
        <Category />
      </CategoryWrapper>
      <BoardWrapper>
        <TopWrapper>
          {/* <CommunitySearch /> */}
          {
            <SearchInput
              category={category as string}
              pathname={`/community/${pathname}`}
              placeholder="게시글 검색하기"
              styleConfig={{ pcWidth: '100%', mobileWidth: '100%', height: '50px' }}
              noOptionsMessage="일치하는 게시글이 없습니다."
            />
          }
          {me ? (
            <StyledButton type="primary" htmlType="button" onClick={openModal}>
              글쓰기
            </StyledButton>
          ) : (
            <Tooltip placement="topLeft" title="로그인이 필요합니다">
              <StyledButton type="primary">글쓰기</StyledButton>
            </Tooltip>
          )}
        </TopWrapper>
        <BoardList />
      </BoardWrapper>
      <BlankBox />
    </Layout>
  );
};

export default Board;

const StyledButton = styled(Button)`
  margin-top: auto;
  margin-left: 30px;
  ${media.mobile} {
    margin: 15px 0 0 auto;
    width: 100px;
  }
`;
const TopWrapper = styled.div`
  display: flex;
  ${media.mobile} {
    flex-direction: column;
  }
`;
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;
const CategoryWrapper = styled.div`
  width: 15%;
  display: flex;
  ${media.mobile} {
    width: 80%;

    margin-bottom: auto;
    margin-top: -70px;
    margin-bottom: 30px;
  }
`;

const BlankBox = styled.div`
  width: 10%;
  ${media.mobile} {
    display: none;
  }
`;

const Layout = styled.div`
  color: #575757;
  max-width: 1200px;
  width: 80vw;
  height: 100%;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${media.mobile} {
    width: 100vw;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
`;
