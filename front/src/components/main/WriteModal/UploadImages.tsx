import React, { useState } from 'react';
import * as U from './style';
import { beforeUpload, uploadButton } from '@lib/ModalUtil';
import { Modal as ImgModal } from 'antd';

const UploadImages = () => {
  const [fileList, setFileList] = useState([]);
  const [uploadValidate, setUploadValidate] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleChange = ({ fileList: newFileList }: { fileList: any }) => {
    if (uploadValidate) setFileList(newFileList);
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
  return (
    <>
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
      <ImgModal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </ImgModal>
    </>
  );
};

export default UploadImages;
