import React from 'react';
import { CardHeader, Row, Col, Button, Media, CardSubtitle } from 'reactstrap';

export const ProcessStepHeader = (step, image, save, index) => {
  return(
  <CardHeader className="bg-white border-bottom-0">
  <Row>
    <Col xs={12}>
    <Media>
      <Media left className="">
        <Media object src={image} alt="Pick Schools" />
      </Media>
      <Media body>
        <Media heading>{step['title']}</Media>
        <CardSubtitle>{step['description']}</CardSubtitle>
      </Media>
      <Button onClick={() => save(index)} color="warning">done</Button>
    </Media>
    </Col>
  </Row>
  </CardHeader>
  );
}