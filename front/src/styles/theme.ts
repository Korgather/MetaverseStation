import styled, { css } from 'styled-components';

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  tablet: customMediaQuery(1024),
  mobile: customMediaQuery(850),
};

export const skeletonCss = css`
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
`;

export const skeletonKeyframes = css`
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;
