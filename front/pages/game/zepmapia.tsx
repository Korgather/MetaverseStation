import React from 'react';
import styled from 'styled-components';

const zepmapia = () => {
  return (
    <Wrapper>
      <iframe src="https://zep.us/play/25g3RQ" className="gameWidget" id="gameWidget"></iframe>
    </Wrapper>
  );
};

export default zepmapia;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  .gameWidget {
    margin-top: 20px;
    border: 1px solid black;
    width: 350px;
    height: 600px;
    background-color: #323232e6;
    color: #aaa;
    border: 12px solid;
    border-image: url(https://klaykingdoms.com/assets/popup_00_frame.a5e41d63.png) 50 50;
  }
`;
