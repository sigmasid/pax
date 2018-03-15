import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Media } from 'reactstrap';
import doneImage from '../images/done_icon_2x.png'; // Tell Webpack this JS file uses this image
//const util = require('util'); //print an object

const PlanStep = (step, index, active, setActiveStep, completed) => {
  var activeCardClass = (active === index) ? "setup-steps bg-warning border-0 pt-3" : "setup-steps bg-white border-0 pt-3";
  var stepClass = (active === index) ? "round hollow sm active text-left text-md-left d-flex mr-3 ml-2 ml-md-0" : "round hollow sm text-left text-md-left d-flex mr-3 ml-2 ml-md-0";

	return(
    <Col lg={3} xs={12} key={index} className="align-self-center">
		  <Card className={activeCardClass} key={index} onClick={() => setActiveStep(index)}>

      <Media className="pb-3 align-self-lg-center align-self-start ml-3 ml-lg-0">
		    <Media left className={stepClass}>
          <h6 className="m-auto align-self-center">{completed[index] ? <Media object src={doneImage} className="img-fluid" /> : index + 1}</h6>
        </Media>
        <Media body className="align-self-center">
		      <Media heading className={active === index ? "font-weight-bold text-white mb-1" : "font-weight-bold text-secondary mb-0"}>{step['title']}</Media>
        </Media>
      </Media>
		  </Card>
    </Col>
	);
}

class PlanSummary extends Component  {
  render() {
    var renderedStep = function(step, index) {
      return(PlanStep(this.props.steps[index], index, this.props.active, this.props.setActiveStep, this.props.completed));
    }.bind(this);

    return (
        <Row className="row-no-padding bg-white border-shadow">
        { Object.keys(this.props.steps).map(renderedStep) }
        </Row>
    );
  }
}

PlanSummary.propTypes = {
  steps: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  completed: PropTypes.array.isRequired
}

export default PlanSummary;