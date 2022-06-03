import { CustomFile, IPostDataForUpdate } from '@customTypes/post';
import { Input } from 'antd';
import { FormikProps } from 'formik';
import React, { SetStateAction } from 'react';
import * as S from './style';
import UploadImages from './UploadImages';
import { IforFormik } from './WriteModalContainer';
interface WriteModalProps {
  formik: FormikProps<IforFormik>;
  closeModal: () => void;
  selectHandler: (e: any) => void;
  gatherState: boolean;
  zepState: boolean;
  secondBlockState: boolean;
  onChangeContent: (content: string) => void;
  prevPostData: IPostDataForUpdate | null;
  postLoading: boolean;
  imageList: CustomFile[];
  setImageList: React.Dispatch<SetStateAction<CustomFile[]>>;
}

const WriteModalView = ({
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
}: WriteModalProps) => {
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
                <S.SelectBtn
                  type="button"
                  onClick={selectHandler}
                  name="secondblock"
                  state={secondBlockState}
                >
                  2ndBlock
                </S.SelectBtn>
              </S.SelectBtnWrapper>
              <S.StyledLabel htmlFor="title">제목</S.StyledLabel>
              <Input
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="제목을 입력해주세요."
                spellCheck="false"
              />
              {formik.errors.title && formik.touched && <S.Error>{formik.errors.title}</S.Error>}
              <S.StyledLabel htmlFor="link">접속링크</S.StyledLabel>
              <Input
                id="link"
                name="link"
                onChange={formik.handleChange}
                value={formik.values.link}
                placeholder="접속링크를 입력해주세요."
                spellCheck="false"
              />
              {formik.errors.link && formik.touched && <S.Error>{formik.errors.link}</S.Error>}
              <UploadImages imageList={imageList} setImageList={setImageList} />
              {formik.errors.images && formik.touched && <S.Error>{formik.errors.images}</S.Error>}
              <S.StyledLabel htmlFor="content">내용</S.StyledLabel>
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

export default WriteModalView;
