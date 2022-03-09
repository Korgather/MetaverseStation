import { closeModal } from '@lib/ModalUtil';
import React, { Dispatch, SetStateAction, useState } from 'react';
import CommentModal from './CommentModal';
import DetailHeader from './DetailHeader';
import HeartAndMessage from './HeartAndMessage';
import SliderImages from './SliderImages';
import * as D from './style';

interface DetailModalProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const DetailModal: React.FunctionComponent<DetailModalProps> = ({ setDetailModalState }) => {
  const [commentState, setCommentState] = useState(false);
  return (
    <>
      <D.ModalWrapper>
        <D.Dim onClick={() => closeModal(setDetailModalState)} />
        <D.Modal commentState={commentState}>
          <DetailHeader setDetailModalState={setDetailModalState} />
          <SliderImages />
          <HeartAndMessage commentState={commentState} setCommentState={setCommentState} />
          <D.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          </D.Content>
        </D.Modal>
        <CommentModal commentState={commentState} />
      </D.ModalWrapper>
    </>
  );
};

export default DetailModal;
