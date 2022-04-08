import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Bookmark } from 'src/svg';
import styled from 'styled-components';

interface IModal {
  commentState: boolean;
}

export const Dim = styled.div`
  width: 100vw;
  height: 200vh;
  background-color: black;
  opacity: 0.3;
  z-index: 100;
  position: fixed;
`;

export const ModalContainer = styled.div`
  position: fixed;
`;

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 300;
`;

export const CommentModal = styled.div<IModal>`
  display: flex;
  z-index: 300;
  background-color: white;
  width: ${(popos) => (popos.commentState ? '22vw' : '0px')};
  height: 78vh;
  border-radius: 10px;
  padding: 20px 0px;
  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
  box-sizing: border-box;
  max-height: 700px;
  max-width: 350px;
  transition: all 100ms linear;
  animation-direction: reverse;
  margin-left: 10px;
  flex-direction: column;
  align-items: center;
`;

export const Modal = styled.div<IModal>`
  z-index: 500;
  background-color: white;
  width: 35vw;
  height: 78vh;
  border-radius: 10px;

  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
  box-sizing: border-box;
  max-height: 700px;
  max-width: 500px;
  min-width: 325px;
  transition: right 100ms linear;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  padding: 15px 30px;
  overflow-y: auto;
  height: 30%;
`;

export const TagsWrapper = styled.div`
  padding: 15px 30px;
  height: 10%;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 700;
  span {
    + span {
      margin-left: 10px;
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 8%;
  width: 100%;
  padding: 10px;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 200px;
  cursor: pointer;
`;

export const NickName = styled.div`
  vertical-align: middle;
  margin-left: 10px;
  font-weight: 600;
`;

export const StyledDownOutlined = styled(DownOutlined)`
  width: 18px;
  svg {
    width: 10px;
  }
`;

export const StyledA = styled.a`
  margin-left: auto;
  margin-right: 20px;
`;

export const CloseModalBtn = styled.div`
  background-color: #dfdada;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 15px;
  cursor: pointer;
`;

export const EntnerButton = styled(Button)`
  border-radius: 5px;
`;

export const HeartAndMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5%;
  align-items: center;
  padding: 20px 15px;
`;

export const StyledSpan = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: auto;
  margin-left: 8px;
  padding-bottom: 1px;
`;

export const SlideWrapper = styled.section`
  margin-top: 10px;
  padding: 0;
  position: relative;
  width: 100%;
  height: 47%;
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  .slick-next {
    right: 0px;
    z-index: 900;
  }
  .slick-prev {
    left: 0px;
    z-index: 900;
  }
`;

export const StyledImages = styled.div`
  img {
    width: 100%;
    height: 309px;
    object-fit: cover;
  }
`;

export const CommentImg = styled.img`
  margin-left: auto;
  width: 1.5rem;
  cursor: pointer;
`;

export const StyledBookmark = styled(Bookmark)`
  margin-left: auto;
`;
