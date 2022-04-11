import React from 'react';
import { Menu, Dropdown } from 'antd';
import { IPost } from '@customTypes/post';
import * as S from './style';
import shortid from 'shortid';
import { useAppDispatch, useAppSelector } from '@store/hook';
import {
  clearpostDetail,
  getPrevPostData,
  ToggleDetailState,
  ToggleWriteModalState,
} from '@slices/postSlice';
import modal from 'antd/lib/modal';
import { removePost } from '@actions/post';
import { useRouter } from 'next/router';

const DetailHeader = () => {
  const router = useRouter();
  const { id: pageNum } = router.query;
  const me = useAppSelector((state) => state.userSlice.me);
  const dispatch = useAppDispatch();
  const postData = useAppSelector((state) => state.postSlice.postDetail);
  const dataForUpdate = {
    images: (postData as IPost).imageList.map((image) => ({
      imagePath: process.env.NEXT_PUBLIC_IMG_URL + image.imagePath,
      origFileName: image.origFileName,
      fileSize: image.fileSize,
      url: process.env.NEXT_PUBLIC_IMG_URL + image.imagePath,
      uid: process.env.NEXT_PUBLIC_IMG_URL + image.imagePath,
    })),
    link: postData?.link,
    title: postData?.title,
    content: postData?.content,
    state: true,
    id: postData?.id,
    category: postData?.category,
  };
  const openUpdateModal = () => {
    dispatch(ToggleDetailState(false));
    dispatch(getPrevPostData(dataForUpdate));
    dispatch(ToggleWriteModalState(true));
    dispatch(clearpostDetail());
  };

  const onRemovePost = () => {
    postData &&
      modal.confirm({
        title: '게시글을 삭제하시겠습니까?',
        onOk: async function async() {
          try {
            await dispatch(removePost(postData?.id));
            pageNum ? router.push(`/${pageNum}`) : router.push('/');
          } catch (e) {
            console.log(e);
          }
        },
      });
  };

  const menu = (
    <Menu>
      <Menu.Item key={shortid.generate()}>
        <a onClick={openUpdateModal}>수정하기</a>
      </Menu.Item>
      <Menu.Item key={shortid.generate()}>
        <a onClick={onRemovePost}>삭제하기</a>
      </Menu.Item>
    </Menu>
  );

  const gotoUserPage = () => {
    const isMe = postData?.postUser.userId === me?.userId;
    const pathname = isMe ? '/mypage' : `/user/${postData?.postUser.userId}`;
    if (postData) {
      const { username, userId, bio, profileImageUrl } = postData.postUser;
      router.push({
        pathname: pathname,
        query: !isMe ? { userId, username, bio, profileImageUrl } : '',
      });
    }
  };
  return (
    <S.HeaderWrapper>
      <S.ProfileImg src={postData?.postUser?.profileImageUrl} alt="" onClick={gotoUserPage} />
      <S.NickName>{postData?.postUser?.username}</S.NickName>
      {postData?.postUser.userId === me?.userId && (
        <Dropdown overlay={menu} trigger={['click']}>
          <S.StyledDownOutlined />
        </Dropdown>
      )}
      <S.StyledA href={postData?.link} target="_blank">
        <S.EntnerButton type="primary" htmlType="button">
          입장하기
        </S.EntnerButton>
      </S.StyledA>
      <S.CloseModalBtn
        onClick={() => {
          dispatch(clearpostDetail());
          dispatch(ToggleDetailState(false));
        }}
      >
        x
      </S.CloseModalBtn>
    </S.HeaderWrapper>
  );
};

export default DetailHeader;
