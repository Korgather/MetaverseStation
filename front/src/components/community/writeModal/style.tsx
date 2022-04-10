import React from 'react';
import { UploadFile } from 'antd/lib/upload/interface';
import { Upload, Input, Tag, Button } from 'antd';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
export interface Props {
  state?: boolean;
  for?: string;
  fileList?: UploadFile[];
  id?: string;
}

export const StyledUpload = styled(Upload)<Props>`
  .ant-upload-list-picture-card-container,
  .ant-upload.ant-upload-select-picture-card {
    width: 10vw;
    height: 15vh;
    min-width: 100px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: cover;
  }
`;

export const Dim = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.3;
  z-index: 100;
  position: fixed;
`;

export const ModalContainer = styled.div`
  position: relative;
`;

export const Modal = styled.div`
  z-index: 500;
  background-color: white;
  width: 60vw;
  height: 90vh;
  top: 45px;
  position: fixed;
  border-radius: 10px;
  padding: 28px 58px;
  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
`;

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CloseModalBtn = styled.div`
  position: absolute;
  top: -10px;
  right: -20px;
  background-color: #dfdada;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  text-align: center;
  font-size: 15px;
  vertical-align: middle;
  font-weight: 600;
  cursor: pointer;
`;

export const SelectBtnWrapper = styled.div`
  display: flex;
`;

export const SelectBtn = styled.button<Props>`
  + button {
    margin-left: 10px;
  }
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #c9cccf;
  padding: 10px 0;
  vertical-align: middle;
  width: 120px;
  text-align: center;
  font-weight: 600;
  color: ${(props) => (props.state ? 'white' : '#575757')};
  background-color: ${(props) => (props.state ? '#428BCA' : 'white')};
  cursor: pointer;
`;

export const StyledLabel = styled.label<Props>`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 20px;
  display: inline-block;
  margin-bottom: 10px;
`;

export const ExplainP = styled.p`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
`;

export const TagPlus = styled(Tag)`
  background: #fff;
  border-style: dashed;
  cursor: pointer;
`;

export const TagInput = styled(Input)`
  width: 78px;
  margin-right: 8px;
  vertical-align: top;
  cursor: pointer;
`;

export const SubmitBtn = styled(Button)`
  margin-left: auto;
`;

export const TagAndBtnWrapper = styled.div`
  display: flex;
`;

export const Error = styled.div`
  color: red;
`;

export const StyledReactQuill = styled(QuillNoSSRWrapper)`
  margin: 20px 0;
  .ql-container.ql-snow {
    max-height: 500px;
    height: 50vh;
  }
`;
