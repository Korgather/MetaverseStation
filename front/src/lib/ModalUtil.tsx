import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

type setFunc = (state: boolean) => void;

export const beforeUploadValidation = (file: { type: string; size: number }) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    alert('You can only upload JPG/PNG file!');
  }
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    alert('Image must smaller than 3MB!');
  }
  return isJpgOrPng && isLt3M;
};

export const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export const closeModal = (setFunc: setFunc) => {
  setFunc(false);
  document.body.style.overflow = 'unset';
};

export const openModal = (setFunc: setFunc) => {
  setFunc(true);
  document.body.style.overflow = 'hidden';
};
