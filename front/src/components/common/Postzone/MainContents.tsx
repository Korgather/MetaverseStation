import React from 'react';
import { IPost } from '@customTypes/post';
import * as S from './style';
import Link from 'next/link';

interface MainContentsProps {
  mainPosts: IPost[];
  openDetailModal: (post: IPost) => void;
}
const MainContents = ({ mainPosts, openDetailModal }: MainContentsProps) => {
  return (
    <>
      {mainPosts.map((post, idx) => (
        <S.StyledCol key={post.id} xs={24} md={12} lg={8} xl={6} style={{}}>
          <S.ImgWrapper>
            <div onClick={() => openDetailModal(post)} data-testid={`open-modal${idx}`}>
              {post.imageList[0]?.imagePath.length >= 20 ? (
                <Link href={`community/post/${post.id}`} scroll={true}>
                  <S.PostImg
                    src={process.env.NEXT_PUBLIC_IMG_URL + post.imageList[0].imagePath}
                    width="100%"
                    height="80%"
                    layout="responsive"
                    objectFit="cover"
                    alt={post.title}
                    quality={10}
                  />
                </Link>
              ) : (
                <S.PostImg
                  src="/images/defaultThumbNail.png"
                  width="100%"
                  height="50px"
                  layout="responsive"
                  alt={`대체이미지${idx}`}
                />
              )}
            </div>
          </S.ImgWrapper>
          <S.Summary>
            {post.category === 'METAVERSE_ZEP' ? (
              <S.Logo src="../../images/zepLogo.png" />
            ) : (
              <S.Logo src="../../images/gatherLogo.png" />
            )}
            <S.Title>{post.title}</S.Title>
            <S.StyledHeartTwoTone twoToneColor="#eb3f96" />
            <S.Count>{Object.keys(post.likeUserList).length}</S.Count>
            <S.CommentImg src="../../images/commentIcon.png" />
            <S.Count>{post.postCommentList.length}</S.Count>
            <S.StyledEyeOutlined />
            <S.Count>{post.view}</S.Count>
          </S.Summary>
          {post.category === 'METAVERSE_GATHERTOWN' && (
            <S.CountBox>
              <S.CountCirCle />
              <S.CountUser>{post.playerCount}</S.CountUser>
            </S.CountBox>
          )}
        </S.StyledCol>
      ))}
    </>
  );
};
export default MainContents;
