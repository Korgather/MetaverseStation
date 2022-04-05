import React, { Dispatch, SetStateAction } from 'react';
import { Menu, Dropdown } from 'antd';
import { closeModal } from '@lib/ModalUtil';
import { IPost } from '@customTypes/post';
import * as S from './style';
import shortid from 'shortid';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { clearDataForModal, getPrevPostData, ToggleWriteModalState } from '@slices/postSlice';
import modal from 'antd/lib/modal';
import { loadPosts, removePost } from '@actions/post';
import { useRouter } from 'next/router';
interface DetailHeaderProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const DetailHeader: React.FunctionComponent<DetailHeaderProps> = ({ setDetailModalState }) => {
  const router = useRouter();
  const { id: pageNum } = router.query;

  const dispatch = useAppDispatch();
  const postData = useAppSelector((state) => state.postSlice.dataForModal);
  const dataForUpdate = {
    images: (postData as IPost).imageList.map((image) => ({
      imagePath: image.imagePath,
      origFileName: image.origFileName,
      fileSize: image.fileSize,
      url: image.imagePath,
      uid: image.imagePath,
    })),
    link: postData?.link,
    title: postData?.title,
    content: postData?.content,
    state: true,
    id: postData?.id,
  };
  const openUpdateModal = () => {
    dispatch(getPrevPostData(dataForUpdate));
    dispatch(ToggleWriteModalState(true));
    dispatch(clearDataForModal());
    closeModal(setDetailModalState);
  };

  const onRemovePost = () => {
    postData &&
      modal.confirm({
        title: '게시글을 삭제하시겠습니까?',
        onOk: async function async() {
          await dispatch(removePost(postData?.id));
          pageNum ? router.push(`/${pageNum}`) : router.push('/');
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
  return (
    <S.HeaderWrapper>
      <S.ProfileImg src={postData?.postUser?.profileImageUrl} />
      <S.NickName>{postData?.postUser?.username}</S.NickName>
      <Dropdown overlay={menu} trigger={['click']}>
        <S.StyledDownOutlined />
      </Dropdown>
      <S.StyledA href="https://cafe.naver.com/gathertown" target="_blank">
        <S.EntnerButton type="primary" htmlType="button">
          입장하기
        </S.EntnerButton>
      </S.StyledA>
      <S.CloseModalBtn
        onClick={() => {
          dispatch(clearDataForModal());
          closeModal(setDetailModalState);
        }}
      >
        x
      </S.CloseModalBtn>
    </S.HeaderWrapper>
  );
};

export default DetailHeader;
