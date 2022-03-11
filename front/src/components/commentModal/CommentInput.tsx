import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;
const CommentInput = () => {
  return (
    <CommentInputWrapper>
      <TextArea rows={6} />
      <StyledButton type="primary">댓글입력</StyledButton>
    </CommentInputWrapper>
  );
};

export default CommentInput;

const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 20%;
  margin-top: auto;
`;

const StyledButton = styled(Button)`
  width: 30%;
  margin-top: 10px;
  margin-left: auto;
  border-radius: 5px;
`;
