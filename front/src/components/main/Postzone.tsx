import React from 'react';
import { Row, Col } from 'antd';

type Props = {};

const Postzone = (props: Props) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {Array.from({ length: 8 }, (v, i) => i).map((el, i) => (
          <Col span={6} style={{ textAlign: 'center' }}>
            <div>
              <img src="https://dummyimage.com/325x220/C4C4C4/fff" />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Postzone;
