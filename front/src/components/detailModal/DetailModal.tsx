import { closeModal } from '@lib/ModalUtil';
import React, { Dispatch, SetStateAction, useState } from 'react';
import CommentModal from './CommentModal';
import DetailHeader from './DetailHeader';
import SliderImages from './SliderImages';
import * as D from './style';

type Props = {};

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
          <div style={{ backgroundColor: 'gray', width: '100%', height: '8%' }}>
            Heart
            <button onClick={() => setCommentState(!commentState)}>메시지</button>
          </div>
          <div style={{ backgroundColor: 'beige', width: '100%', height: '42%' }}></div>
        </D.Modal>
        <CommentModal commentState={commentState} />
      </D.ModalWrapper>
    </>
  );
};

export default DetailModal;
