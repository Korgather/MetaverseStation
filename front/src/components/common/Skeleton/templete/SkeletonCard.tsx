import React from 'react';
import styled from 'styled-components';
import Skeleton from '@components/common/Skeleton';
const SkeletonCard = () => {
  const { Square, Circle } = Skeleton;
  return (
    <SkeletonCardContainer>
      <Square width="300px" height="200px" />
      <div className="skeleton-card-explain-wrapper">
        <Circle width="30px" height="30px" className="skeleton-card-circle" />
        <Square width="100%" height="20px" className="skeleton-card-square-one" />
        <Square width="100%" height="20px" className="skeleton-card-square-two" />
      </div>
    </SkeletonCardContainer>
  );
};

export default SkeletonCard;

const SkeletonCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  .skeleton-card-explain-wrapper {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    align-items: center;
  }
  .skeleton-card-square-one {
    margin-right: auto;
    width: 100%;
  }
  .skeleton-card-square-two {
    width: 80%;
    margin-left: auto;
  }
`;
