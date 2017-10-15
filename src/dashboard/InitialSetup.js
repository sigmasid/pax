import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade, Card, CardBody, CardHeader, Row, Col, ButtonGroup, Button, Media, CardSubtitle, CardFooter, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import getStartedIcon from '../images/get_started_2x.png'; // Tell Webpack this JS file uses this image
import doneImage from '../images/done_icon_2x.png'; // Tell Webpack this JS file uses this image
import { CollegeSearch } from '../home/CollegeSearch.js';
import CollegeCard from '../home/CollegeCard.js';
const util = require('util'); //print an object

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

class InitialSetup extends Component {
  render() {
  	return(
    <Card className="Dashboard-component mb-5 mt-5">
      <CardBody>
        <Row>
          <Col xs={12} sm={9} md={8}>
          <Media>
            <Media left>
              <Media object src={getStartedIcon} alt="Start Setup" />
            </Media>
            <Media body>
              <Media heading>
                Let's Get Started
              </Media>
              <CardSubtitle>We'll create a customized plan in a few quick steps to get {this.props.beneficiaryName} on the path to college!</CardSubtitle>
            </Media>
          </Media>
          </Col>
        </Row>
      </CardBody>
      <CardBody>
      	<Button>Get Started</Button>
      </CardBody>
    </Card>
  	)
  }
}

export default InitialSetup;