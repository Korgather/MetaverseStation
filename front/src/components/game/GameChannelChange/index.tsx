import { getMapiaUserCount } from '@actions/game';
import { LoadingOutlined } from '@ant-design/icons';
import CloseButton from '@components/common/CloseButton';
import { useAppDispatch } from '@store/hook';
import { Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SetStateAction, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
interface IOmokHashId {
  id: string;
  ch: number;
}
interface IGameChannelChange {
  channelState: boolean;
  setChannelState: React.Dispatch<SetStateAction<boolean>>;
}
const GameChannelChange = ({ channelState, setChannelState }: IGameChannelChange) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [urlHashId, setUrlHashId] = useState<IOmokHashId[]>([]);
  const [userCount, setUserCount] = useState<number[]>([]);
  const [currentChannel, setCurrentChannel] = useState<number>();
  const omokHashId = [
    { id: '2RdjJG', ch: 1 },
    { id: 'yW90xn', ch: 2 },
    { id: 'DwPrge', ch: 3 },
    { id: '2Xwk0J', ch: 4 },
    { id: 'yPJzYV', ch: 5 },
    { id: '8M1l47', ch: 6 },
    { id: '2exEWL', ch: 7 },
    { id: '87nvLb', ch: 8 },
  ];
  useEffect(() => {
    setUrlHashId(() => omokHashId);
    omokHashId.map((data) => {
      if (router.asPath.includes(data.id)) {
        setCurrentChannel(() => data.ch);
      }
    });
  }, [router.asPath]);
  useEffect(() => {
    if (urlHashId.length === 8) {
      (async () => {
        const result = await Promise.all([
          await dispatch(getMapiaUserCount(urlHashId[0].id)),
          await dispatch(getMapiaUserCount(urlHashId[1].id)),
          await dispatch(getMapiaUserCount(urlHashId[2].id)),
          await dispatch(getMapiaUserCount(urlHashId[3].id)),
          await dispatch(getMapiaUserCount(urlHashId[4].id)),
          await dispatch(getMapiaUserCount(urlHashId[5].id)),
          await dispatch(getMapiaUserCount(urlHashId[6].id)),
          await dispatch(getMapiaUserCount(urlHashId[7].id)),
        ]);
        setUserCount((el) => {
          const data = result.map((el) => el.payload);
          return data;
        });
      })();
    }
  }, [urlHashId, router.asPath]);
  const onClose = () => {
    setChannelState(() => false);
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 20, marginLeft: '5px' }} spin />;
  return (
    <GameChannelChangeLayout>
      <Wrapper>
        <h3>채널 변경</h3>
        <ul>
          {omokHashId.map((data, idx) => (
            <li key={idx}>
              <Link href={`/game/omok/${data.id}`}>
                <UserCountWrapper selected={idx + 1 === currentChannel}>
                  <span>{`CH${idx + 1}`}</span>
                  <Circle />
                  {typeof userCount[idx] !== 'undefined' ? (
                    <span>{userCount[idx]}</span>
                  ) : (
                    <Spin indicator={antIcon} />
                  )}
                </UserCountWrapper>
              </Link>
            </li>
          ))}
        </ul>
        <CloseButton onClose={onClose} />
      </Wrapper>
    </GameChannelChangeLayout>
  );
};

export default GameChannelChange;
interface ISelected {
  selected: boolean;
}
const Circle = styled.div`
  width: 14px;
  height: 14px;
  margin-top: 2px;
  border-radius: 15px;
  background-color: #06d6a0;
  margin-right: 10px;
  margin-left: auto;
`;
const GameChannelChangeLayout = styled.div`
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
`;

const Wrapper = styled.div`
  background-color: #ffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  min-width: 290px;
  position: relative;
  h3 {
    font-weight: 600;
    margin: 10px 0 10px 20px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const UserCountWrapper = styled.div<ISelected>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
  span:not(:first-child) {
    margin-right: 20px;
  }
  padding: 10px 20px;
  :hover {
    background-color: #e3e3e3;
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: #e3e3e3;
    `}
`;
