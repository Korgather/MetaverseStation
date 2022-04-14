import { loadMyInfo, updateProfile } from '@actions/user';
import { beforeUploadValidation, closeModal, uploadButton } from '@lib/ModalUtil';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Input, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import styled from 'styled-components';

interface ProfileEditModalProps {
  setEditModalState: Dispatch<SetStateAction<boolean>>;
}

const ProfileEditModal: React.FunctionComponent<ProfileEditModalProps> = ({
  setEditModalState,
}) => {
  const dispatch = useAppDispatch();
  const AccessToken = useAppSelector((state) => state.userSlice.AccessToken);
  const me = useAppSelector((state) => state.userSlice.me);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [currentImg, setCurrentImg] = useState(me?.profileImageUrl);
  const uploadImage = async (options: any) => {
    const { onSuccess, onError } = options;
    uploadSuccess ? onSuccess('Ok') : onError('error');
  };
  const RequestUploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append('data', file);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/profileimage`, fd, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      setCurrentImg(process.env.NEXT_PUBLIC_PROFILE_IMG_URL + res.data[0]);
      setUploadSuccess('ok');
    } catch (e) {
      setUploadSuccess('error');
    }
    return '';
  };
  useEffect(() => {
    formik.setValues((values) => ({ ...values, profileImageUrl: currentImg }));
  }, [currentImg]);
  const formik = useFormik({
    initialValues: {
      username: me?.userName,
      bio: me?.bio,
      profileImageUrl: me?.profileImageUrl,
    },
    onSubmit: async (values) => {
      await dispatch(updateProfile(values));
      await dispatch(loadMyInfo());
      setEditModalState(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalWrapper>
        <Dim onClick={() => closeModal(setEditModalState)} />
        <Modal>
          <ImgWrapper>
            <StyledUpload
              customRequest={uploadImage}
              action={RequestUploadImage}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUploadValidation}
            >
              {me?.profileImageUrl ? (
                <img
                  src={currentImg ? currentImg : me?.profileImageUrl}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </StyledUpload>
          </ImgWrapper>
          <StyledP>이메일</StyledP>
          <StyledInput value={me?.email} disabled style={{ color: '#5a5a5a' }}></StyledInput>
          <StyledP>닉네임</StyledP>
          <StyledInput
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          ></StyledInput>
          <StyledP>자기소개</StyledP>
          <StyledTextArea
            rows={8}
            id="bio"
            name="bio"
            onChange={formik.handleChange}
            value={formik.values.bio}
          ></StyledTextArea>
          <StyledButton type="primary" htmlType="submit">
            수정하기
          </StyledButton>
        </Modal>
      </ModalWrapper>
    </form>
  );
};

export default ProfileEditModal;

const ImgWrapper = styled.div``;
const StyledUpload = styled(Upload)`
  img,
  .ant-upload.ant-upload-select-picture-card {
    border-radius: 500px !important;
  }
  img {
    height: 100%;
    object-fit: cover;
  }
`;
const StyledP = styled.p`
  margin-right: auto;
  margin-bottom: 3px;
  margin-top: 10px;
`;
const StyledInput = styled(Input)``;

const StyledTextArea = styled(TextArea)``;
const StyledButton = styled(Button)`
  margin-left: auto;
  margin-top: 20px;
`;

export const Modal = styled.div`
  z-index: 500;
  background-color: white;
  width: 40vw;
  height: 60vh;
  border-radius: 10px;
  padding: 20px 50px;
  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
  box-sizing: border-box;
  max-height: 530px;
  max-width: 620px !important;
  min-width: 325px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Dim = styled.div`
  width: 100vw;
  height: 200vh;
  background-color: black;
  opacity: 0.3;
  z-index: 100;
  position: fixed;
`;

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 300;
`;
