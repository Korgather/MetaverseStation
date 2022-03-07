import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
const { TextArea } = Input;
const WriteModal = ({ state }: Props) => {
  const [gatherState, setGatherState] = useState(false);
  const [zepState, setZepState] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploadValidate, setUploadValidate] = useState(true);

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      alert('You can only upload JPG/PNG file!');
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      alert('Image must smaller than 3MB!');
    }
    setUploadValidate(isJpgOrPng && isLt3M);
    return isJpgOrPng && isLt3M;
  }

  const handleChange = ({ fileList: newFileList }) => {
    if (uploadValidate) setFileList(newFileList);
    console.log(fileList);
  };
  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    if (typeof image === 'string') image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const selectHandler = useCallback(
    (e) => {
      const { name } = e.target;
      if (name === 'gather') {
        setGatherState(true);
        setZepState(false);
      }
      if (name === 'zep') {
        setGatherState(false);
        setZepState(true);
      }
    },
    [gatherState, zepState],
  );

  return (
    <>
      <Dim />
      <ModalWrapper>
        <Modal>
          <h3>카테고리</h3>
          <SelectBtnWrapper>
            <SelectBtn onClick={selectHandler} name="gather" state={gatherState}>
              Gathertown
            </SelectBtn>
            <SelectBtn onClick={selectHandler} name="zep" state={zepState}>
              Zep
            </SelectBtn>
          </SelectBtnWrapper>
          <StyledLabel htmlFor="title">제목</StyledLabel>
          <Input id="title" placeholder="제목을 입력해주세요."></Input>
          <StyledLabel htmlFor="link">접속링크</StyledLabel>
          <Input id="link" placeholder="접속링크를 입력해주세요."></Input>
          <StyledLabel htmlFor="mainImg">메인이미지</StyledLabel>
          <StyledUpload
            beforeUpload={beforeUpload}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </StyledUpload>
          <StyledLabel htmlFor="content">내용</StyledLabel>
          <TextArea id="content" rows={8} placeholder="메타버스 공간을 소개해주세요." />
          <StyledLabel htmlFor="tags">태그</StyledLabel>
          <Input id="tags" placeholder="#gathertown #zep"></Input>
        </Modal>
      </ModalWrapper>
    </>
  );
};

export default WriteModal;

interface Props {
  state?: boolean;
  for?: string;
  fileList?: UploadFile[];
  id?: string;
}

const StyledUpload = styled(Upload)<Props>`
  .ant-upload-list-picture-card-container,
  .ant-upload.ant-upload-select-picture-card {
    width: 10.3vw;
    height: 15vh;
  }
`;

const Dim = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.3;
  z-index: 100;
  position: fixed;
`;
const Modal = styled.div`
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
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectBtnWrapper = styled.div`
  display: flex;
`;

const SelectBtn = styled.button<Props>`
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

const StyledLabel = styled.label<Props>`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 10px;
  display: inline-block;
`;
