import React, { ReactNode } from 'react';
import styled from 'styled-components';
export interface ICardProps {
  children: ReactNode | ReactNode[];
  modalState: boolean;
  style?: React.CSSProperties;
}
const Card = (props: ICardProps) => {
  const { children, modalState, style } = props;
  return (
    <>
      {modalState && (
        <>
          <CardLayout className="card" style={style}>
            {children}
          </CardLayout>
        </>
      )}
    </>
  );
};

export default Card;

const CardLayout = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 4px;
  background-color: #fff;
  border-radius: 5px;
  :before {
    content: '';
    position: absolute;
    background-color: #fff;
    width: 10px;
    height: 10px;
    top: 7px;
    left: -4px;
    transform: rotate(45deg);
  }
`;
