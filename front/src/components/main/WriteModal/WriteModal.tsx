import React, { useState, useCallback, useRef, Dispatch, SetStateAction } from 'react';
import { Input, Modal as ImgModal } from 'antd';
import { beforeUpload, uploadButton } from '@lib/ModalUtil';
import * as U from './style';

interface WriteModalProps {
  setWriteModalState: Dispatch<SetStateAction<boolean>>;
}

const { TextArea } = Input;
const WriteModal: React.FunctionComponent<WriteModalProps> = ({ setWriteModalState }) => {
  const [gatherState, setGatherState] = useState(false);
  const [zepState, setZepState] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploadValidate, setUploadValidate] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleChange = ({ fileList: newFileList }: { fileList: any }) => {
    console.log(fileList);
    if (uploadValidate) setFileList(newFileList);
    console.log(fileList);
  };

  const handlePreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        console.log(file);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewTitle(file.name);
    setPreviewVisible(true);
    setPreviewImage(src);
    const image = new Image();
    image.src = src;
  };

  const handleCancel = () => setPreviewVisible(false);

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
      <U.Dim onClick={() => setWriteModalState(false)} />
      <U.ModalWrapper>
        <U.Modal>
          <U.ModalContainer>
            <U.closeModalBtn onClick={() => setWriteModalState(false)}>x</U.closeModalBtn>
            <h3>카테고리</h3>
            <U.SelectBtnWrapper>
              <U.SelectBtn onClick={selectHandler} name="gather" state={gatherState}>
                Gathertown
              </U.SelectBtn>
              <U.SelectBtn onClick={selectHandler} name="zep" state={zepState}>
                Zep
              </U.SelectBtn>
            </U.SelectBtnWrapper>
            <U.StyledLabel htmlFor="title">제목</U.StyledLabel>
            <Input id="title" placeholder="제목을 입력해주세요."></Input>
            <U.StyledLabel htmlFor="link">접속링크</U.StyledLabel>
            <Input id="link" placeholder="접속링크를 입력해주세요."></Input>
            <U.StyledLabel htmlFor="mainImg">메인이미지</U.StyledLabel>
            <U.StyledUpload
              beforeUpload={(File) => setUploadValidate(beforeUpload(File))}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </U.StyledUpload>
            <U.StyledLabel htmlFor="content">내용</U.StyledLabel>
            <TextArea id="content" rows={8} placeholder="메타버스 공간을 소개해주세요." />
            <U.StyledLabel htmlFor="tags">태그</U.StyledLabel>
            <Input id="tags" placeholder="#gathertown #zep"></Input>
            <ImgModal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </ImgModal>
          </U.ModalContainer>
        </U.Modal>
      </U.ModalWrapper>
    </>
  );
};

export default WriteModal;
