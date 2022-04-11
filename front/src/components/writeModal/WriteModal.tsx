import React, { useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import { useFormik } from 'formik';
import UploadImages from './UploadImages';
import * as Yup from 'yup';
import { CustomFile, IPost } from '@customTypes/post';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { addPost, updatePost } from '@actions/post';
import * as S from './style';
import { getPrevPostData, ToggleWriteModalState } from '@slices/postSlice';
import { useRouter } from 'next/router';

const { TextArea } = Input;
interface IforFormik extends Pick<IPost, 'title' | 'content' | 'link' | 'postCommentList'> {
  images: Omit<CustomFile, 'file'>[] | void[];
  id?: string;
}
const WriteModal = () => {
  const dispatch = useAppDispatch();
  const prevPostData = useAppSelector((state) => state.postSlice.prevPostData);
  const [content, setContent] = useState('');
  const [gatherState, setGatherState] = useState(prevPostData?.category === 'METAVERSE_GATHERTOWN');
  const [zepState, setZepState] = useState(prevPostData?.category === 'METAVERSE_ZEP');
  const router = useRouter();
  const [category, setCategory] = useState(prevPostData?.category ? prevPostData?.category : '');
  const [imageList, setImageList] = useState<CustomFile[]>([]);
  const postLoading = useAppSelector((state) => state.postSlice.addPostLoading);
  const PostSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, '2글자 이상 입력해주세요')
      .max(50, '제목이 너무 길어요')
      .required('제목은 필수입니다.'),
    link: Yup.string().url('올바른 링크를 입력해주세요').required('링크는 필수입니다.'),
    // content: Yup.string().min(2, '10글자 이상 입력해주세요').required('내용은 필수입니다.'),
    images: Yup.array().min(1, '이미지를 1개 이상 등록해주세요.'),
  });
  const closeModal = () => {
    dispatch(ToggleWriteModalState(false));
    dispatch(getPrevPostData(null));
  };
  const onChangeContent = (content: string) => {
    setContent(content);
  };

  const formik = useFormik({
    initialValues: {
      title: `${prevPostData ? prevPostData.title : ''}`,
      // content: `${prevPostData ? prevPostData.content : ''}`,
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
      try {
        prevPostData
          ? await dispatch(updatePost({ link, title, content, images, id, category }))
          : await dispatch(addPost({ link, title, content, images, category }));
        router.push('/');
        dispatch(ToggleWriteModalState(false));
        dispatch(getPrevPostData(null));
      } catch (e) {
        console.log(e);
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
    (e) => {
      const { name } = e.target;
      if (name === 'gather') {
        setGatherState(true);
        setZepState(false);
        setCategory('METAVERSE_GATHERTOWN');
      }
      if (name === 'zep') {
        setGatherState(false);
        setZepState(true);
        setCategory('METAVERSE_ZEP');
      }
    },
    [gatherState, zepState],
  );

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <S.Dim onClick={closeModal} />
        <S.ModalWrapper>
          <S.Modal>
            <S.ModalContainer>
              <S.CloseModalBtn onClick={closeModal}>x</S.CloseModalBtn>
              <h3>카테고리</h3>
              <S.SelectBtnWrapper>
                <S.SelectBtn
                  type="button"
                  onClick={selectHandler}
                  name="gather"
                  state={gatherState}
                >
                  Gathertown
                </S.SelectBtn>
                <S.SelectBtn type="button" onClick={selectHandler} name="zep" state={zepState}>
                  Zep
                </S.SelectBtn>
              </S.SelectBtnWrapper>
              <S.StyledLabel htmlFor="title">제목</S.StyledLabel>
              <Input
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="제목을 입력해주세요."
              />
              {formik.errors.title && formik.touched && <S.Error>{formik.errors.title}</S.Error>}
              <S.StyledLabel htmlFor="link">접속링크</S.StyledLabel>
              <Input
                id="link"
                name="link"
                onChange={formik.handleChange}
                value={formik.values.link}
                placeholder="접속링크를 입력해주세요."
              />
              {formik.errors.link && formik.touched && <S.Error>{formik.errors.link}</S.Error>}
              <UploadImages imageList={imageList} setImageList={setImageList} />
              {formik.errors.images && formik.touched && <S.Error>{formik.errors.images}</S.Error>}
              <S.StyledLabel htmlFor="content">내용</S.StyledLabel>
              {/* <TextArea
                id="content"
                name="content"
                onChange={formik.handleChange}
                value={formik.values.content}
                rows={8}
                placeholder="메타버스 공간을 소개해주세요."
              />
              {formik.errors.content && formik.touched && (
                <S.Error>{formik.errors.content}</S.Error>
              )} */}
              <S.StyledReactQuill
                onChange={(content) => onChangeContent(content)}
                defaultValue={prevPostData?.content ? prevPostData?.content : ''}
              />

              <S.TagAndBtnWrapper>
                <S.SubmitBtn type="primary" htmlType="submit" loading={postLoading}>
                  {prevPostData ? '수정하기' : '등록하기'}
                </S.SubmitBtn>
              </S.TagAndBtnWrapper>
            </S.ModalContainer>
          </S.Modal>
        </S.ModalWrapper>
      </form>
    </>
  );
};

export default WriteModal;
