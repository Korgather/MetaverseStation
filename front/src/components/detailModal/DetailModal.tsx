import CommentModal from "@components/commentModal/CommentModal";
import { closeModal } from "@lib/ModalUtil";
import { useAppSelector } from "@store/hook";
import React, { Dispatch, SetStateAction, useState } from "react";
import DetailHeader from "./DetailHeader";
import HeartAndMessage from "./HeartAndMessage";
import SliderImages from "./SliderImages";
import * as S from "./style";

interface DetailModalProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const DetailModal: React.FunctionComponent<DetailModalProps> = ({ setDetailModalState }) => {
  const [commentState, setCommentState] = useState(false);
  const postData = useAppSelector((state) => state.postSlice.dataForModal);
  return (
    <>
      {postData && (
        <S.ModalWrapper>
          <S.Dim onClick={() => closeModal(setDetailModalState)} />
          <S.Modal commentState={commentState}>
            <DetailHeader postData={postData} setDetailModalState={setDetailModalState} />
            <SliderImages postData={postData} />
            <HeartAndMessage commentState={commentState} setCommentState={setCommentState} />
            <S.Content>{postData.content} </S.Content>
            <S.TagsWrapper>
              {postData.tags?.map((tag) => (
                <span># {tag}</span>
              ))}
            </S.TagsWrapper>
          </S.Modal>
          <CommentModal commentState={commentState} postData={postData} />
        </S.ModalWrapper>
      )}
    </>
  );
};

export default DetailModal;
