import React from 'react';
import { IPost } from '@customTypes/post';
import * as S from './style';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface MainContentsProps {
  mainPosts: IPost[];
  onLoadPost: (post: IPost) => void;
}
const MainContents = ({ mainPosts, onLoadPost }: MainContentsProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 20, marginLeft: '5px' }} spin />;
  const loading = <Spin indicator={antIcon} />;

  return (
    <>
      {mainPosts.map((post) => (
        <S.StyledCol key={post.id} xs={24} md={12} lg={8} xl={6} style={{}}>
          <S.ImgWrapper>
            <div onClick={() => onLoadPost(post)}>
              {post.imageList[0]?.imagePath.length >= 20 ? (
                <S.PostImg
                  src={process.env.NEXT_PUBLIC_IMG_URL + post.imageList[0].imagePath}
                  width="100%"
                  height="80%"
                  layout="responsive"
                  objectFit="cover"
                  alt={post.title}
                  quality={10}
                />
              ) : (
                <S.PostImg
                  src="/images/defaultThumbNail.png"
                  width="100%"
                  height="50px"
                  layout="responsive"
                  alt="대체이미지"
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
