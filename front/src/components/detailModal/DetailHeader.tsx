import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { closeModal } from '@lib/ModalUtil';
import { IPost } from '@customTypes/post';

interface DetailHeaderProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
  postData: IPost;
}

const DetailHeader: React.FunctionComponent<DetailHeaderProps> = ({ setDetailModalState, postData }) => {
  const menu = (
    <Menu>
      <Menu.Item key={'dropdownItem1'}>
        <a onClick={() => alert('수정하기 구현예정')}>수정하기</a>
      </Menu.Item>
      <Menu.Item key={'dropdownItem2'}>
        <a onClick={() => alert('삭제하기 구현예정')}>삭제하기</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderWrapper>
      <ProfileImg src="/images/profile01.png" />
      <NickName>{postData.User?.nickname}</NickName>
      <Dropdown overlay={menu} trigger={['click']}>
        <StyledDownOutlined />
      </Dropdown>
      <StyledA href="https://cafe.naver.com/gathertown" target="_blank">
        <EntnerButton type="primary" htmlType="button">
          입장하기
        </EntnerButton>
      </StyledA>
      <CloseModalBtn onClick={() => closeModal(setDetailModalState)}>x</CloseModalBtn>
    </HeaderWrapper>
  );
};

export default DetailHeader;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 8%;
  width: 100%;
  padding: 10px;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
`;

const NickName = styled.div`
  vertical-align: middle;
  margin-left: 10px;
  font-weight: 600;
`;

const StyledDownOutlined = styled(DownOutlined)`
  width: 18px;
  svg {
    width: 10px;
  }
`;

const StyledA = styled.a`
  margin-left: auto;
  margin-right: 20px;
`;

const CloseModalBtn = styled.div`
  background-color: #dfdada;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 15px;
  cursor: pointer;
`;

const EntnerButton = styled(Button)`
  border-radius: 5px;
`;
