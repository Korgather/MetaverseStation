import React, { Dispatch, SetStateAction } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { closeModal } from '@lib/ModalUtil';
import { IPost } from '@customTypes/post';
import * as S from './style';
import shortid from 'shortid';
interface DetailHeaderProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
  postData: IPost;
}

const DetailHeader: React.FunctionComponent<DetailHeaderProps> = ({
  setDetailModalState,
  postData,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key={shortid.generate()}>
        <a onClick={() => alert('수정하기 구현예정')}>수정하기</a>
      </Menu.Item>
      <Menu.Item key={shortid.generate()}>
        <a onClick={() => alert('삭제하기 구현예정')}>삭제하기</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <S.HeaderWrapper>
      <S.ProfileImg src={postData.User?.profileImageUrl} />
      <S.NickName>{postData.User?.username}</S.NickName>
      <Dropdown overlay={menu} trigger={['click']}>
        <S.StyledDownOutlined />
      </Dropdown>
      <S.StyledA href="https://cafe.naver.com/gathertown" target="_blank">
        <S.EntnerButton type="primary" htmlType="button">
          입장하기
        </S.EntnerButton>
      </S.StyledA>
      <S.CloseModalBtn onClick={() => closeModal(setDetailModalState)}>x</S.CloseModalBtn>
    </S.HeaderWrapper>
  );
};

export default DetailHeader;
