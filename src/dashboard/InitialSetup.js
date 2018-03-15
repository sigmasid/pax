import React, { Component } from 'react';
import { Card, CardBody, Row, Col, Button, Media, CardSubtitle } from 'reactstrap';
import getStartedIcon from '../images/get_started_2x.png'; // Tell Webpack this JS file uses this image

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