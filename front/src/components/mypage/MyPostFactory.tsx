import React, { Dispatch, SetStateAction } from 'react';
import * as S from './style';
import { Col } from 'antd';
import { IPost } from '@customTypes/post';
import { openModal } from '@lib/ModalUtil';
import { useAppDispatch } from '@store/hook';
import { loadPost } from '@actions/post';
import shortid from 'shortid';
import { motion } from 'framer-motion';
import { pageVariants } from '@assets/motionVarints';

interface IMyPostFactoryProps {
  Posts: IPost[] | null;
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const MyPostFactory = ({ Posts, setDetailModalState }: IMyPostFactoryProps) => {
  const dispatch = useAppDispatch();
  const openDetailModal = (data: IPost) => {
    dispatch(loadPost(data.id));
  };
  return (
    <>
      {Posts?.map((post) => (
        <Col key={post.id} xs={24} md={12} lg={8} xl={8} style={{}}>
          <div key={`mypage/${shortid.generate()}`}>
            <S.ImgWrapper>
              <div
                onClick={() => {
                  post && openDetailModal(post);
                  openModal(setDetailModalState);
                }}
              >
                {post.imageList[0]?.imagePath.length >= 20 ? (
                  <S.PostImg
                    src={process.env.NEXT_PUBLIC_IMG_URL + post.imageList[0].imagePath}
                    alt={post.imageList[0].origFileName}
                  />
                ) : (
                  <S.PostImg src="../../images/thumbnail02.png" alt="defaultImage" />
                )}
              </div>
            </S.ImgWrapper>
            <S.Summary>
              {post.category === 'METAVERSE_ZEP' ? (
                <S.Logo src="../../images/zepLogo.png" alt="zepLogo" />
              ) : (
                <S.Logo src="../../images/gatherLogo.png" alt="gathertownLogo" />
              )}
              <S.Title>{post.title}</S.Title>
              <S.StyledHeartTwoTone twoToneColor="#eb3f96" />
              <S.Count>{Object.keys(post.likeUserList).length}</S.Count>
              <S.CommentImg src="../../images/commentIcon.png" />
              <S.Count>{post.postCommentList.length}</S.Count>
              <S.StyledEyeOutlined />
              <S.Count>{post.view}</S.Count>
            </S.Summary>
          </div>
        </Col>
      ))}
    </>
  );
};

export default MyPostFactory;
