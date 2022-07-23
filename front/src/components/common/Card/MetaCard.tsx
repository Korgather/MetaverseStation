import { Col } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { EyeOutlined, HeartTwoTone } from '@ant-design/icons';
import { useMedia } from '@lib/useMedia';
import { IPost } from '@customTypes/post';
interface MetaCardProps {
  post: IPost;
  openDetailModal: (post: IPost) => void;
  handleImgError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  idx?: number;
}
const MetaCard: React.FC<MetaCardProps> = ({ post, openDetailModal, handleImgError, idx }) => {
  const { isMobile } = useMedia();
  return (
    <MetaCardContainer xs={24} md={12} lg={8} xl={6} style={{}}>
      <div className="metacard-img-wrapper">
        <div onClick={() => openDetailModal(post)} data-testid={`open-modal${idx}`}>
          {isMobile ? (
            <Link href={`community/post/${post.id}`} scroll={true}>
              <Image
                className="metacard-thumnail-img"
                src={process.env.NEXT_PUBLIC_IMG_URL + post.imageList[0].imagePath}
                width="100%"
                height="80%"
                layout="responsive"
                objectFit="cover"
                alt={post.title}
                quality={10}
                onError={handleImgError}
              />
            </Link>
          ) : (
            <Image
              src={process.env.NEXT_PUBLIC_IMG_URL + post.imageList[0].imagePath}
              width="100%"
              height="80%"
              layout="responsive"
              objectFit="cover"
              alt={post.title}
              quality={10}
              onError={handleImgError}
            />
          )}
        </div>
      </div>
      <div className="metacard-content-wrapper">
        <div className="metacard-logo-wrapper">
          {post.category === 'METAVERSE_ZEP' ? (
            <Image
              src="/images/zepLogo.png"
              width={30}
              height={30}
              layout="responsive"
              alt="zepLogo"
            />
          ) : post.category === 'METAVERSE_GATHERTOWN' ? (
            <Image
              src="/images/gatherLogo.png"
              width={30}
              height={30}
              layout="responsive"
              alt="gathertownLogo"
            />
          ) : (
            <Image
              src="/images/secondblockLogo.png"
              width={30}
              height={30}
              layout="responsive"
              alt="secondblockLogo"
            />
          )}
        </div>
        <div className="metacard-content-title">{post.title}</div>
        <HeartTwoTone className="metacard-icon-heart" twoToneColor="#eb3f96" />
        <div className="metacard-icon-count">{Object.keys(post.likeUserList).length}</div>
        <img className="metacard-icon-comment" src="../../images/commentIcon.png" alt="comment" />
        <div className="metacard-icon-count">{post.postCommentList.length}</div>
        <EyeOutlined className="metacard-icon-eye" />
        <div className="metacard-icon-count">{post.view}</div>
      </div>
      {post.category === 'METAVERSE_GATHERTOWN' && (
        <div className="metacard-current-user-count-wrapper">
          <div className="metacard-current-user-circle" />
          <div className="metacard-current-user-count">{post.playerCount}</div>
        </div>
      )}
    </MetaCardContainer>
  );
};

export default MetaCard;

interface MetaCardStyleProps {
  imageHeight?: string;
}

const MetaCardContainer = styled(Col)<MetaCardStyleProps>`
  position: relative;
  .metacard-img-wrapper {
    cursor: pointer;
    width: 340px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 0 auto;
    margin-bottom: 10px;
    @media screen and (max-width: 1700px) {
      width: 19vw;
    }
    @media screen and (max-width: 1200px) {
      width: 22vw;
    }
    @media screen and (max-width: 992px) {
      width: 32vw;
    }
    @media screen and (max-width: 768px) {
      width: 70vw;
    }
    ${(props) =>
      !props.imageHeight &&
      css`
        height: 15.625rem;
        @media screen and (max-width: 1700px) {
          height: calc(19vw * 0.8);
          max-height: 19vw;
          width: 19vw;
        }
        @media screen and (max-width: 1200px) {
          height: calc(22vw * 0.8);
          max-height: 22vw;
          width: 22vw;
        }
        @media screen and (max-width: 992px) {
          height: calc(32vw * 0.8);
          max-height: 32vw;
          width: 32vw;
        }
        @media screen and (max-width: 768px) {
          height: calc(70vw * 0.8);
          max-height: 70vw;
          width: 70vw;
        }
      `};
  }
  .metacard-content-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    @media screen and (max-width: 768px) {
      width: 70vw;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
  }
  .metacard-logo-wrapper {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .metacard-content-title {
    font-size: 1rem;
    font-weight: 600;
    flex: 1;
    line-height: 1;
    margin: 2px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .metacard-icon-heart {
    margin-left: auto;
    font-size: 1.1rem;
    margin-top: 2px;
  }
  .metacard-icon-count {
    font-size: 0.8rem;
    font-weight: 600;
    margin-right: 0.5rem;
    margin-left: 2px;
  }
  .metacard-icon-comment {
    margin-left: auto;
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 2px;
  }
  .metacard-icon-eye {
    font-size: 1.1rem;
    margin-top: 2px;
  }
  .metacard-current-user-count-wrapper {
    position: absolute;
    width: 50px;
    height: 30px;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.8);
    top: 10px;
    left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .metacard-current-user-circle {
    width: 12px;
    height: 12px;
    border-radius: 15px;
    background-color: #06d6a0;
    margin-left: 10px;
  }
  .metacard-current-user-count {
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    flex: 1;
    text-align: center;
    margin-right: 6px;
  }
  .metacard-thumnail-img {
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    :hover {
      transform: scale(1.1);
    }
  }
`;
