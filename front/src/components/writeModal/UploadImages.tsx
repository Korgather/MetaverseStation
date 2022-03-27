import React, { useState } from "react";
import * as U from "./style";
import { beforeUploadValidation, uploadButton } from "@lib/ModalUtil";
import { Modal as ImgModal } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import Axios from "axios";

const UploadImages = () => {
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [uploadValidate, setUploadValidate] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const RequestUploadImage = async (file: File) => {
    console.log(file);
    const fd = new FormData();
    fd.append("data", file);
    await Axios.post(
      "http://metastation-env.eba-jip4zmfh.ap-northeast-2.elasticbeanstalk.com/api/v1/upload",
      fd,
    );
    return "";
  };

  const handlePreviewFile = async (file: File | Blob): Promise<string> =>
    await new Promise((resolve) => {
      if (uploadValidate) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
      } else {
        resolve("");
      }
    });

  const handleOnPreview = async (file: UploadFile) => {
    if (file) {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as Blob);
          reader.onload = () => resolve(reader.result as string);
        });
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

  const handleCancel = () => setPreviewVisible(false);
  return (
    <>
      <U.StyledLabel htmlFor="mainImg">메인이미지</U.StyledLabel>
      <U.StyledUpload
        beforeUpload={(file, fileList) => {
          const result = beforeUploadValidation(file);
          setUploadValidate(result);
          if (result === false) {
            fileList.pop();
          }
          return result;
        }}
        action={RequestUploadImage}
        listType="picture-card"
        onPreview={handleOnPreview}
        previewFile={handlePreviewFile}
        onChange={({ fileList }) => setImageList(fileList)}
      >
        {imageList.length >= 5 ? null : uploadButton}
      </U.StyledUpload>
      <ImgModal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </ImgModal>
    </>
  );
};

export default UploadImages;
