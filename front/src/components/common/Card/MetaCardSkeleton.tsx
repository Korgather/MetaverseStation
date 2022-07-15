import { Col } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import { skeletonCss, skeletonKeyframes } from '@styles/theme';
const MetaCardSkeleton: React.FC = () => {
  return (
    <MetaCardContainer xs={24} md={12} lg={8} xl={6} style={{}}>
      <div className="metacard-img-wrapper"></div>
      <div className="metacard-content-wrapper">
        <div className="metacard-logo-wrapper"></div>
        <div className="metacard-content-title"></div>
        <div className="metacard-content-icons"></div>
      </div>
    </MetaCardContainer>
  );
};

export default MetaCardSkeleton;

interface MetaCardStyleProps {
  imageHeight?: string;
}

const MetaCardContainer = styled(Col)<MetaCardStyleProps>`
  ${skeletonKeyframes}
  position: relative;
  .metacard-img-wrapper {
    ${skeletonCss}
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
    border-radius: 50px;
    margin-right: 10px;
    ${skeletonCss}
  }
  .metacard-content-title,
  .metacard-content-icons {
    ${skeletonCss}
    height: 1.1rem;
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
  .metacard-thumnail-img {
    border-radius: 10px;
  }
`;
