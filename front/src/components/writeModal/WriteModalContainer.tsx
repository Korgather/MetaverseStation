import React, { useState, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomFile, IPost } from '@customTypes/post';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { addPost, updatePost } from '@actions/post';
import { getPrevPostData, ToggleWriteModalState } from '@slices/postSlice';
import { useRouter } from 'next/router';
import WriteModalView from './WriteModalView';
export interface IforFormik extends Pick<IPost, 'title' | 'content' | 'link' | 'postCommentList'> {
  images: Omit<CustomFile, 'file'>[] | void[];
  id?: string;
}
const WriteModal = () => {
  const dispatch = useAppDispatch();
  const prevPostData = useAppSelector((state) => state.postSlice.prevPostData);
  const [content, setContent] = useState(prevPostData?.content ? prevPostData.content : '');
  const [gatherState, setGatherState] = useState(prevPostData?.category === 'METAVERSE_GATHERTOWN');
  const [zepState, setZepState] = useState(prevPostData?.category === 'METAVERSE_ZEP');
  const [secondBlockState, setSecondBlockState] = useState(
    prevPostData?.category === 'METAVERSE_2NDBLCOK',
  );
  const router = useRouter();
  const [category, setCategory] = useState(prevPostData?.category ? prevPostData?.category : '');
  const [imageList, setImageList] = useState<CustomFile[]>([]);
  const postLoading = useAppSelector((state) => state.postSlice.addPostLoading);
  const PostSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, '5글자 이상 입력해주세요')
      .max(50, '제목이 너무 길어요')
      .required('제목은 필수입니다.'),
    link: Yup.string().url('올바른 링크를 입력해주세요').required('링크는 필수입니다.'),
    images: Yup.array().min(1, '이미지를 1개 이상 등록해주세요.'),
  });
  const closeModal = () => {
    dispatch(ToggleWriteModalState(false));
    dispatch(getPrevPostData(null));
  };
  const onChangeContent = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    return () => {
      dispatch(ToggleWriteModalState(false));
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      title: `${prevPostData ? prevPostData.title : ''}`,
      link: `${prevPostData ? prevPostData.link : ''}`,
      postCommentList: [],
      images: prevPostData?.images ? prevPostData.images : [],
      id: prevPostData?.id,
    },
    onSubmit: async (values: IforFormik) => {
      values.images = imageList.map(({ imagePath, origFileName, fileSize }) => ({
        imagePath,
        origFileName,
        fileSize,
      }));
      const { images, link, title, id } = values;
      if (!category) {
        alert('카테고리를 선택해주세요');
        return;
      }
      let res;
      prevPostData
        ? (res = await dispatch(updatePost({ link, title, content, images, id, category })))
        : (res = await dispatch(addPost({ link, title, content, images, category })));
      if (res.type === 'post/add/fulfilled' || res.type === 'post/update/fulfilled') {
        router.push('/');
      }
    },
    validationSchema: PostSchema,
    validateOnChange: true,
  });
  useEffect(() => {
    formik.setValues((value) => ({
      ...value,
      images: imageList.map(({ imagePath, origFileName, fileSize }) => ({
        imagePath,
        origFileName,
        fileSize,
      })),
    }));
  }, [imageList]);

  const selectHandler = useCallback(
    (e: React.ChangeEvent<HTMLButtonElement>) => {
      const { name } = e.target;
      if (name === 'gather') {
        setGatherState(true);
        setZepState(false);
        setSecondBlockState(false);
        setCategory(() => 'METAVERSE_GATHERTOWN');
      }
      if (name === 'zep') {
        setZepState(true);
        setGatherState(false);
        setSecondBlockState(false);
        setCategory(() => 'METAVERSE_ZEP');
      }
      if (name === 'secondblock') {
        setSecondBlockState(true);
        setGatherState(false);
        setZepState(false);
        setCategory(() => 'METAVERSE_2NDBLOCK');
      }
    },
    [gatherState, zepState],
  );
  const WriteModalProps = {
    formik,
    closeModal,
    selectHandler,
    gatherState,
    zepState,
    secondBlockState,
    onChangeContent,
    prevPostData,
    postLoading,
    imageList,
    setImageList,
  };

  return <WriteModalView {...WriteModalProps} />;
};

export default WriteModal;
