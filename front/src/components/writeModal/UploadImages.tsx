import React, { Dispatch, SetStateAction, useState } from "react";
import * as U from "./style";
import { beforeUploadValidation, uploadButton } from "@lib/ModalUtil";
import { Modal as ImgModal } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import Axios from "axios";
import { CustomFile } from "@customTypes/post";

interface UploadImagesProps {
  setImageList: Dispatch<SetStateAction<CustomFile[]>>;
  imageList: CustomFile[];
}

const UploadImages: React.FC<UploadImagesProps> = ({ setImageList, imageList }) => {
  const [uploadValidate, setUploadValidate] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const RequestUploadImage = async (file: File) => {
    console.log(file);
    const fd = new FormData();
    fd.append("data", file);
    const res = await Axios.post(
      "http://metastation-env.eba-jip4zmfh.ap-northeast-2.elasticbeanstalk.com/api/v1/upload",
      fd,
    );
    console.log(file);
    setImageList([
      ...imageList,
      { file, imagePath: res.data[0], fileSize: file.size, origFileName: file.name },
    ]);
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

  const onRemove = (file: File) => {
    const RemoveIdx = imageList.findIndex((el) => el.file === file);
    console.log(RemoveIdx);
    setImageList(() => imageList.filter((el, idx) => idx !== RemoveIdx));
  };
  const handleCancel = () => setPreviewVisible(false);
  return (
    <>
      <U.StyledLabel htmlFor="mainImg">메인이미지</U.StyledLabel>
      <U.StyledUpload
        beforeUpload={(file, fileList) => {
          const result = beforeUploadValidation(file);
          setUploadValidate(result);
          return result;
        }}
        action={RequestUploadImage}
        listType="picture-card"
        onPreview={handleOnPreview}
        previewFile={handlePreviewFile}
        // onChange={({ file }) => onChangeImageList(file)}
        onRemove={(file) => {
          onRemove(file.originFileObj as File);
        }}
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
