import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const Postzone = () => {
  return (
    <div>
      {/* <Row gutter={[16, 16]}> */}
      <Row
        justify="start"
        gutter={[
          { xs: 4, sm: 18, md: 16, lg: 24 },
          { xs: 4, sm: 8, md: 16, lg: 24 },
        ]}
      >
        {Array.from({ length: 8 }, (v, i) => i).map((el, i) => (
          // <Col span={6} style={{ textAlign: 'center' }}>
          <Col key={'PostCard' + i} xs={24} md={12} lg={8} xl={6} style={{}}>
            <PostImg src="https://dummyimage.com/325x220/C4C4C4/fff" />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Postzone;

const PostImg = styled.img`
  width: 17.5vw;

  @media screen and (max-width: 1650px) {
    width: 17vw;
  }
  @media screen and (max-width: 1200px) {
    width: 22vw;
  }
  @media screen and (max-width: 992px) {
    width: 32vw;
  }
  @media screen and (max-width: 768px) {
    width: 70vw;
  }
`;
