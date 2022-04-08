import React, { useCallback, useState } from 'react';
import { Input } from 'antd';
import * as Yup from 'yup';
import { useAppDispatch } from '@store/hook';
import * as S from './style';
import { ToggleCommunityWriteModalState } from '@slices/communitySlice';
import { useFormik } from 'formik';
import { addComPost } from '@actions/community';
import { useRouter } from 'next/router';

const WriteModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(ToggleCommunityWriteModalState(false));
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [questionState, setQuestionState] = useState(false);
  const [freeState, setFreeState] = useState(false);
  const [studyState, setStudyState] = useState(false);
  const pathIndex = router.pathname.lastIndexOf('/');
  const pathName = router.pathname.slice(0, pathIndex);
  const onChangeContent = (content: string) => {
    setContent(content);
  };

  const PostSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, '제목을 2글자 이상 입력해주세요')
      .max(100, '제목이 너무 길어요')
      .required('제목은 필수입니다.'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: async (values) => {
      if (!category) {
        alert('카테고리를 선택해주세요.');
        return;
      }
      const submitData = {
        title: values.title,
        content: content,
        category,
      };
      try {
        dispatch(addComPost(submitData));
        router.push(`${pathName}/1`);
      } catch (e) {
        console.error(e);
      } finally {
        closeModal();
      }
    },
    validationSchema: PostSchema,
    validateOnChange: true,
  });
  const selectHandler = useCallback(
    (e) => {
      const { name } = e.target;
      if (name === 'question') {
        setQuestionState(true);
        setStudyState(false);
        setFreeState(false);
        setCategory('COMMUNITY_QUESTION');
      }
      if (name === 'study') {
        setQuestionState(false);
        setStudyState(true);
        setFreeState(false);
        setCategory('COMMUNITY_STUDY');
      }
      if (name === 'free') {
        setQuestionState(false);
        setStudyState(false);
        setFreeState(true);
        setCategory('COMMUNITY_GENERAL');
      }
    },
    [questionState, freeState, studyState],
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
                  name="question"
                  state={questionState}
                >
                  질문 & 답변
                </S.SelectBtn>
                <S.SelectBtn type="button" onClick={selectHandler} name="free" state={freeState}>
                  자유주제
                </S.SelectBtn>
                <S.SelectBtn type="button" onClick={selectHandler} name="study" state={studyState}>
                  스터디 모집
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
              <S.StyledReactQuill onChange={(content) => onChangeContent(content)} />
              <S.TagAndBtnWrapper>
                <S.SubmitBtn type="primary" htmlType="submit">
                  등록하기
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
