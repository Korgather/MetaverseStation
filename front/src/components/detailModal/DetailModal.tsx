import CommentModal from '@components/commentModal/CommentModal';
import { closeModal } from '@lib/ModalUtil';
import { useAppSelector } from '@store/hook';
import React, { Dispatch, SetStateAction, useState } from 'react';
import DetailHeader from './DetailHeader';
import HeartAndMessage from './HeartAndMessage';
import SliderImages from './SliderImages';
import * as D from './style';

interface DetailModalProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const DetailModal: React.FunctionComponent<DetailModalProps> = ({ setDetailModalState }) => {
  const [commentState, setCommentState] = useState(false);
  const postData = useAppSelector((state) => state.postSlice.dataForModal);
  return (
    <>
      {postData && (
        <D.ModalWrapper>
          <D.Dim onClick={() => closeModal(setDetailModalState)} />
          <D.Modal commentState={commentState}>
            <DetailHeader postData={postData} setDetailModalState={setDetailModalState} />
            <SliderImages postData={postData} />
            <HeartAndMessage commentState={commentState} setCommentState={setCommentState} />
            <D.Content>{postData.content} </D.Content>
          </D.Modal>
          <CommentModal commentState={commentState} postData={postData} />
        </D.ModalWrapper>
      )}
    </>
  );
};

export default DetailModal;
