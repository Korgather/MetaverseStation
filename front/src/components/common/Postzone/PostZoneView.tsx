import { IPost } from '@customTypes/post';
import { Row } from 'antd';
import React from 'react';
import * as S from './style';

interface PostZoneViewProps {
  mainPosts: IPost[];
  onLoadPost: (post: IPost) => void;
}
const PostZoneView = ({ mainPosts, onLoadPost }: PostZoneViewProps) => {
  return (
    <S.PostZoneWrapper>
      <Row
        justify="start"
        gutter={[
          { xs: 4, sm: 18, md: 16, lg: 24 },
          { xs: 4, sm: 8, md: 16, lg: 24 },
        ]}
      >
        {mainPosts.length >= 1 &&
          mainPosts.map((post) => (
            <S.StyledCol key={post.id} xs={24} md={12} lg={8} xl={6} style={{}}>
              <S.ImgWrapper>
                <div onClick={() => onLoadPost(post)}>
                  {post.imageList[0]?.imagePath.length >= 20 ? (
                    <S.PostImg
                      src={process.env.NEXT_PUBLIC_IMG_URL + post.imageList[0].imagePath}
                    />
                  ) : (
                    <S.PostImg src="../../images/defaultThumbNail.png" />
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
      </Row>
    </S.PostZoneWrapper>
  );
};

export default PostZoneView;
