import React from 'react';
import * as S from './style';
import { IPost } from '@customTypes/post';
import { Row } from 'antd';
import MainContents from './MainContents';
import GameContents from './GameContents';
import { GameImages } from './PostZoneContainer';

export interface PostZoneViewProps {
  mainPosts: IPost[] | null;
  openDetailModal: (post: IPost) => void;
  Images: GameImages[] | null;
  imageHeight: string;
  gotoDetail: (post: IPost) => void;
}

const PostZoneView = ({
  mainPosts,
  openDetailModal,
  Images,
  imageHeight,
  gotoDetail,
}: PostZoneViewProps) => {
  return (
    <S.PostZoneWrapper>
      <Row
        justify="start"
        gutter={[
          { xs: 4, sm: 18, md: 16, lg: 24 },
          { xs: 4, sm: 8, md: 16, lg: 24 },
        ]}
      >
        {mainPosts ? (
          <MainContents
            openDetailModal={openDetailModal}
            mainPosts={mainPosts}
            gotoDetail={gotoDetail}
          />
        ) : (
          Images && <GameContents Images={Images} imageHeight={imageHeight} />
        )}
      </Row>
    </S.PostZoneWrapper>
  );
};

export default PostZoneView;
