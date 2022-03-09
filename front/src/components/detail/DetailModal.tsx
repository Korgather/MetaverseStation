import React, { useState } from 'react';
import CommentModal from './CommentModal';
import * as D from './style';

type Props = {};

const DetailModal = (props: Props) => {
  const [commentState, setCommentState] = useState(false);
  return (
    <>
      <D.Dim />
      <D.ModalWrapper>
        <D.Modal commentState={commentState}>
          <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'red', height: '10%', width: '100%' }}>
            <div>프로필이미지</div>
            <div>스누피</div>
            <div>Dropdown</div>
            <button>입장하기</button>
            <button>닫기버튼</button>
          </div>
          <div style={{ backgroundColor: 'yellow', width: '100%', height: '42%' }}>이미지 캐술러 구현</div>
          <div style={{ backgroundColor: 'gray', width: '100%', height: '8%' }}>
            Heart
            <button onClick={() => setCommentState(!commentState)}>메시지</button>
          </div>
          <div style={{ backgroundColor: 'beige', width: '100%', height: '40%' }}></div>
        </D.Modal>
        <CommentModal commentState={commentState} />
      </D.ModalWrapper>
    </>
  );
};

export default DetailModal;
