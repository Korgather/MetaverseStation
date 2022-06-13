import React from 'react';
import styled from 'styled-components';
export interface ICardProps {
  onClose: React.MouseEventHandler<HTMLElement>;
}
const CloseButton = (props: ICardProps) => {
  const { onClose } = props;
  return <CloseButtonLayout onClick={onClose}>x</CloseButtonLayout>;
};

export default CloseButton;

const CloseButtonLayout = styled.div`
  position: absolute;
  right: 15px;
  top: 6px;
  padding: 3px 7px;
  background-color: #e3e3e3;
  border-radius: 50%;
  font-size: 0.8rem;
  line-height: 1;
  cursor: pointer;
`;
