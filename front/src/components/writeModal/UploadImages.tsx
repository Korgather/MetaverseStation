import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as U from './style';
import { beforeUploadValidation, uploadButton } from '@lib/ModalUtil';
import { Modal as ImgModal, Upload } from 'antd';
import { CustomDefaultFileList, UploadFile } from 'antd/lib/upload/interface';
import axios from 'axios';
import { CustomFile } from '@customTypes/post';
import { useAppSelector } from '@store/hook';

interface UploadImagesProps {
  setImageList: Dispatch<SetStateAction<CustomFile[]>>;
  imageList: CustomFile[];
}

const UploadImages: React.FC<UploadImagesProps> = ({ setImageList, imageList }) => {
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadValidate, setUploadValidate] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const AccessToken = useAppSelector((state) => state.userSlice.AccessToken);
  const prevPostData = useAppSelector((state) => state.postSlice.prevPostData);

  useEffect(() => {
    prevPostData && setImageList(prevPostData.images);
  }, []);

  const RequestUploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append('data', file);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, fd, {
        headers: {
          Authorization: `Bearer ${AccessToken}}`,
        },
      });
      setCurrentImageUrl(res.data[0]);
      setImageList([
        ...imageList,
        { file, imagePath: res.data[0], fileSize: file.size, origFileName: file.name },
      ]);
      setUploadSuccess('ok');
    } catch (e) {
      console.log(e);
      setUploadSuccess('error');
    }

    return '';
  };
  const uploadImage = async (options: any) => {
    const { onSuccess, onError } = options;
    uploadSuccess ? onSuccess('Ok') : onError('error');
  };

  const handlePreviewFile = async (): Promise<string> =>
    await new Promise((resolve) => {
      if (uploadValidate) {
        resolve(currentImageUrl);
      } else {
        resolve('');
      }
    });

  const handleOnPreview = async (file: UploadFile) => {
    if (file) {
      let src = file.url;
      if (!src) {
        src = currentImageUrl;
      }
      if (src !== undefined) {
        setPreviewTitle(file.name);
        setPreviewVisible(true);
        setPreviewImage(src);
        const image = new Image();
        image.src = src;
      }
    }
  };

  const onRemove = (file: UploadFile<unknown> | CustomDefaultFileList) => {
    let RemoveIdx = imageList.findIndex(
      (el) => el.imagePath === (file as CustomDefaultFileList).imagePath,
    );
    if (RemoveIdx === -1) {
      RemoveIdx = imageList.findIndex(
        (el) => el.imagePath === (file as UploadFile<unknown>).thumbUrl,
      );
    }
    setImageList(() => imageList.filter((el, idx) => idx !== RemoveIdx));
  };

  const handleCancel = () => setPreviewVisible(false);
  return (
    <>
      <U.StyledLabel htmlFor="mainImg">메인이미지</U.StyledLabel>
      <U.StyledUpload
        beforeUpload={(file) => {
          const result = beforeUploadValidation(file);
          setUploadValidate(result);
          return result === false ? Upload.LIST_IGNORE : true;
        }}
        customRequest={uploadImage}
        action={RequestUploadImage}
        listType="picture-card"
        onPreview={handleOnPreview}
        previewFile={handlePreviewFile}
        defaultFileList={prevPostData?.images}
        onRemove={(file) => {
          onRemove(file);
        }}
      >
        {imageList.length >= 5 ? null : uploadButton}
      </U.StyledUpload>
      <ImgModal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </ImgModal>
    </>
  );
};

export default UploadImages;
