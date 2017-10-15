import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardHeader, Row, Col, Card, Button, CardBody, Media, CardSubtitle, CardFooter } from 'reactstrap';
import doneImage from '../images/done_icon_2x.png'; // Tell Webpack this JS file uses this image

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