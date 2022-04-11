import { deleteAlram, loadPost } from '@actions/post';
import { loadMyInfo } from '@actions/user';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { IPost } from '@customTypes/post';
import { ToggleDetailState } from '@slices/postSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Dropdown, Menu } from 'antd';
import Router from 'next/router';
import React from 'react';
import shortid from 'shortid';
import styled from 'styled-components';

const Alram = () => {
  const dispatch = useAppDispatch();
  const onSelect = async ({ key }: { key: string }) => {
    if (key === 'clear_alram') {
      try {
        dispatch(deleteAlram('all'));
        await dispatch(loadMyInfo());
      } catch (e) {
        console.log(e);
      }

      return;
    }
    const postIdx = key.indexOf('_');
    const notifyIdx = key.lastIndexOf('_');
    const notifyId = key.slice(notifyIdx + 1);
    console.log(notifyId);
    const postId = key.slice(0, postIdx);
    const openDetailModal = async () => {
      dispatch(ToggleDetailState(true));
    };
    try {
      const postData: IPost = await (await dispatch(loadPost(Number(postId)))).payload;
      await dispatch(deleteAlram(notifyId));
      console.log(postData);
      postData.category && postData.category?.indexOf('METAVERSE') > -1
        ? openDetailModal()
        : Router.push(`/community/post/${postId}`);
    } catch (e) {
      console.log(e);
      alert('존재하지 않는 게시물입니다.');
    } finally {
      await dispatch(loadMyInfo());
    }
  };
  const alram = useAppSelector((state) => state.userSlice.me?.notificationResponseDtoList);
  const menu = (
    <Menu onClick={({ key }) => onSelect({ key })}>
      <StyledMenuItem
        style={{
          fontSize: '1rem',
          fontWeight: '700',
        }}
        key="alram_count"
      >
        읽지 않은 알림 <span style={{ color: '#578CF0', fontSize: '1.2rem' }}>{alram?.length}</span>{' '}
        개
      </StyledMenuItem>
      <Menu.Divider />

      {alram?.map((message) => (
        <StyledMenuItem
          key={`${message.postId}_${message.notificationId}`}
        >{`"${message.postTitle.slice(0, 10)}..." 게시글에 댓글이 달렸습니다.`}</StyledMenuItem>
      ))}

      <StyledMenuItem
        key="clear_alram"
        style={{
          backgroundColor: '#578CF0',
          padding: '10px 0',
          color: 'white',
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        알림 모두 지우기
      </StyledMenuItem>
    </Menu>
  );
  return (
    <MessageWrapper>
      <StyledDropdown key={shortid.generate()} overlay={menu} arrow={false} placement="topRight">
        <a
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          style={{
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: '600',
            fontSize: '1rem',
          }}
        >
          <StyledBellOutlined />
          {alram && alram.length >= 1 && <MessageAlarm>●</MessageAlarm>}
          <DownOutlined />
        </a>
      </StyledDropdown>
    </MessageWrapper>
  );
};

export default Alram;

const StyledDropdown = styled(Dropdown)`
  top: 100px;
`;

const StyledMenuItem = styled(Menu.Item)`
  padding: 20px;
  text-align: center;
`;

const StyledBellOutlined = styled(BellOutlined)`
  margin-top: 26px;
  svg {
    height: 1.6rem;
    width: 1.6rem;
  }
  :hover {
    svg {
      transition: all 0.2s ease-in;

      fill: #44adfa;
    }
  }
  padding: 0 20px;
  cursor: pointer;
`;

const MessageWrapper = styled.div`
  position: relative;
  .anticon-down {
    display: none;
  }
`;
const MessageAlarm = styled.div`
  position: absolute;
  top: 0;
  right: 21px;
  color: red;
  font-size: 0.5rem;
`;
