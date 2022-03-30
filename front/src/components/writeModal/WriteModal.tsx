import React, { useState, useCallback, Dispatch, SetStateAction, useEffect } from "react";
import { Input } from "antd";
import { useFormik } from "formik";
import UploadImages from "./UploadImages";
import * as Yup from "yup";
import { CustomFile, IPost } from "@customTypes/post";
import WriteTag from "./WriteTag";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { addPost } from "@actions/post";
import * as S from "./style";
import { closeModal } from "@lib/ModalUtil";

interface WriteModalProps {
  setWriteModalState: Dispatch<SetStateAction<boolean>>;
}

const { TextArea } = Input;
interface IforFormik extends IPost {
  images: Omit<CustomFile, "file">[] | void[];
  author: string;
}
const WriteModal: React.FC<WriteModalProps> = ({ setWriteModalState }) => {
  const dispatch = useAppDispatch();
  const [gatherState, setGatherState] = useState(false);
  const [zepState, setZepState] = useState(false);
  const [category, setCategory] = useState("");
  const [imageList, setImageList] = useState<CustomFile[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const postLoading = useAppSelector((state) => state.postSlice.addPostLoading);
  const userId = useAppSelector((state) => state.userSlice.me?.userId);
  const PostSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "2글자 이상 입력해주세요")
      .max(50, "제목이 너무 길어요")
      .required("제목은 필수입니다."),
    link: Yup.string().url("올바른 링크를 입력해주세요").required("링크는 필수입니다."),
    content: Yup.string().min(2, "10글자 이상 입력해주세요").required("내용은 필수입니다."),
    images: Yup.array().min(1, "이미지를 1개 이상 등록해주세요."),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      link: "",
      tags: [],
      category: "",
      Comments: [],
      images: [],
      author: userId as string,
    },
    onSubmit: (values: IforFormik) => {
      values.tags = tags;
      values.category = category;
      values.images = imageList.map(({ imagePath, origFileName, fileSize }) => ({
        imagePath,
        origFileName,
        fileSize,
      }));
      console.log(values.images);
      const { images, link, title, author, content } = values;

      dispatch(addPost({ link, title, content, images }));
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

    return () => console.log("모달창나갈때, 이미지삭제요청 보낼예정입니다.");
  }, [imageList]);

  const selectHandler = useCallback(
    (e) => {
      const { name } = e.target;
      if (name === "gather") {
        setGatherState(true);
        setZepState(false);
        setCategory("gathertown");
      }
      if (name === "zep") {
        setGatherState(false);
        setZepState(true);
        setCategory("zep");
      }
    },
    [gatherState, zepState],
  );

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <S.Dim onClick={() => closeModal(setWriteModalState)} />
        <S.ModalWrapper>
          <S.Modal>
            <S.ModalContainer>
              <S.CloseModalBtn onClick={() => closeModal(setWriteModalState)}>x</S.CloseModalBtn>
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
              <TextArea
                id="content"
                name="content"
                onChange={formik.handleChange}
                value={formik.values.content}
                rows={8}
                placeholder="메타버스 공간을 소개해주세요."
              />
              {formik.errors.content && formik.touched && (
                <S.Error>{formik.errors.content}</S.Error>
              )}
              <S.StyledLabel htmlFor="tags">
                태그 <S.ExplainP>(*최대 5개)</S.ExplainP>
              </S.StyledLabel>
              <S.TagAndBtnWrapper>
                <WriteTag setTags={setTags} tags={tags} />
                <S.SubmitBtn type="primary" htmlType="submit" loading={postLoading}>
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
