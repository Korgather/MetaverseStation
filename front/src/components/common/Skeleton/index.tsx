import React from 'react';
import styled from 'styled-components';

interface normalProps {
  width?: string;
  height?: string;
  className?: string;
}
interface squareProps extends normalProps {
  borderRadius?: string;
}

const Skeleton = {
  Square: ({ ...props }: squareProps) => {
    return (
      <Container {...props}>
        <div className={`skeleton-square-wrapper loading ${props.className}`}></div>
      </Container>
    );
  },
  Circle: ({ ...props }: normalProps) => {
    return (
      <Container {...props}>
        <div className={`skeleton-circle-wrapper loading ${props.className}`}></div>
      </Container>
    );
  },
};

export default Skeleton;

const Container = styled.div<squareProps>`
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
  .skeleton-square-wrapper {
    width: ${(props) => props.width || '100px'};
    height: ${(props) => props.height || '100px'};
    border-radius: ${(props) => props.borderRadius || '0px'};
  }
  .skeleton-circle-wrapper {
    width: ${(props) => props.width || '100px'};
    height: ${(props) => props.height || '100px'};
    border-radius: 50%;
  }
  .loading {
    position: relative;
    background-color: #ecf0f1;
    ::after {
      display: block;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
      animation: loading 1.5s infinite;
    }
  }
`;
