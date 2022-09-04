import React, { Dispatch, SetStateAction } from 'react';
import { Menu, Dropdown, Tooltip } from 'antd';
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
import { generateBetweenTime } from '@lib/generateBetweenTime';
import { getAuthorInfo } from '@slices/userSlice';
interface DetailHeader {
  setCommentState: Dispatch<SetStateAction<boolean>>;
}
const DetailHeader: React.FunctionComponent<DetailHeader> = ({ setCommentState }) => {
  const router = useRouter();
  const { id: pageNum } = router.query;
  const me = useAppSelector((state) => state.userSlice.me);
  const dispatch = useAppDispatch();
  const postData = useAppSelector((state) => state.postSlice.postDetail);
  const dataForUpdate = {
    images: (postData as IPost).imageList.map((image) => ({
      imagePath:
        image.imagePath.indexOf('https://cdn.metabusstation.shop/static') === -1
          ? image.imagePath
          : process.env.NEXT_PUBLIC_IMG_URL + image.imagePath,
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

  const gotoDetailPage = () => router.push(`community/post/${postData?.id}`);
  return (
    <S.HeaderWrapper>
      {me ? (
        <S.ProfileImg src={postData?.postUser?.profileImageUrl} alt="" />
      ) : (
        <Tooltip placement="topLeft" title="로그인이 필요합니다">
          <S.ProfileImg src={postData?.postUser?.profileImageUrl} alt="" />
        </Tooltip>
      )}
      <S.NickName>{postData?.postUser?.username}</S.NickName>

      {postData?.postUser.userId === me?.userId && (
        <Dropdown overlay={menu} trigger={['click']}>
          <S.StyledDownOutlined />
        </Dropdown>
      )}
      <S.Date>{postData && generateBetweenTime(postData)}</S.Date>
      <S.TopWrapper>
        <Tooltip placement="left" title="페이지로 보기">
          <S.StyledSelectOutlined onClick={gotoDetailPage} />
        </Tooltip>
        <S.CloseModalBtn
          onClick={() => {
            dispatch(clearpostDetail());
            dispatch(ToggleDetailState(false));
            setCommentState(false);
          }}
        >
          x
        </S.CloseModalBtn>
      </S.TopWrapper>
    </S.HeaderWrapper>
  );
};

export default DetailHeader;
