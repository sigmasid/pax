import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, CardDeck, Row, Col, Card, CardBody, Button, Media, CardTitle, CardSubtitle, CardFooter } from 'reactstrap';
import getStartedIcon from '../images/get_started_2x.png'; // Tell Webpack this JS file uses this image
import doneImage from '../images/done_icon_2x.png'; // Tell Webpack this JS file uses this image
const util = require('util'); //print an object

const PlanStep = (step, index, active, setActiveStep, completed) => {
  var activeCardClass = (active === index) ? "setup-steps rounded bg-white mb-3 mb-md-0 d-block" : "setup-steps rounded bg-light  mb-3 mb-md-0 d-none d-md-block";
  var activeCardFooterClass = (active === index) ? "bg-white border-top-0 d-md-block d-none" : "bg-light border-top-0 d-none d-md-block";
  var buttonColor = (active === index) ? "warning" : "secondary";
  var stepClass = (active === index) ? "round hollow sm active text-center text-md-left d-flex m-auto" : "round hollow sm text-center text-md-left d-flex m-auto" 
	return(
		<Card className={activeCardClass} key={index} >
    	<Media className={completed[index] ? "pr-1 visible" : "pr-1 invisible"}>
    		<Media right className="ml-auto">
    			<Media object src={doneImage} className="img-fluid" />
    		</Media>
    	</Media>
    	<CardBody>
        <Row>
          <Col xs={12} md={3}>
    		    <span className={stepClass}>
    			   <h5 className="m-auto align-self-center">{index + 1}</h5>             
    		    </span>
          </Col>
          <Col xs={12} md={9}>
    		    <CardTitle className="text-center pt-3 pt-md-0 font-weight-bold text-md-left">{step['title']}</CardTitle>
    		    <CardSubtitle className="text-left pt-2 d-none d-md-block">{step['description']}</CardSubtitle>
          </Col>
        </Row>
    	</CardBody>
    	<CardFooter className={activeCardFooterClass}>
    		<Button color={buttonColor} block size="sm" onClick={() => setActiveStep(index)}>{active === index ? "In-progress" : step['complete'] ? "Edit" : "Start"}</Button>
    	</CardFooter>
		</Card>
	);
}

class PlanSummary extends Component  {
  render() {
    var renderedStep = function(step, index) {
      return(PlanStep(this.props.steps[index], index, this.props.active, this.props.setActiveStep, this.props.completed));
    }.bind(this);

    return (
      <CardDeck>
      { Object.keys(this.props.steps).map(renderedStep) }
      </CardDeck>
    );
  }
}

export default PlanSummary;