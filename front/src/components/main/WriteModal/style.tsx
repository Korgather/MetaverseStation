import { UploadFile } from 'antd/lib/upload/interface';
import { Upload } from 'antd';
import styled from 'styled-components';

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

export const closeModalBtn = styled.div`
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
  margin-top: 10px;
  display: inline-block;
`;
