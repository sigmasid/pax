import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Fade } from 'reactstrap';

import PickSchools from './PickSchools.js'; // Tell Webpack this JS file uses this image
import ConnectBank from './ConnectBank.js'; // Tell Webpack this JS file uses this image
import InvestmentAmount from './InvestmentAmount.js'; // Tell Webpack this JS file uses this image
import PlanSummary from './PlanSummary.js'; // Tell Webpack this JS file uses this image
const util = require('util'); //print an object

class CreatePlan extends Component  {
  constructor (props) {
    super(props);

    var steps = [{title: "Pick Target School", description: "Pick dream schools for your customized savings plan!"},
                  {title: "Pick Investing Strategy", description: "Choose a diversified investment mix based on risk preferance!"},    
    							{title: "Set Recurring Investments", description: "Set it & forget it - we'll deduct a set amount each month!"},
                  {title:"Connect Your Bank", description: "Finish up by linking your bank account securely"}];
    this.state = { steps: steps, active: 0, completed: [false,false,false,false] };
    this.setActiveStep = this.setActiveStep.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
  }

  setActiveStep(step) {
    this.setState({active: step});
  }

  markCompleted(step) {
    var completed = this.state.completed;
    completed[step] = true;
    console.log("completed is "+completed);
    this.setState({completed: completed, active: this.state.active + 1});
  }

  render() {
    return (
      <Container fluid className="Container-main" >
        <PlanSummary steps={this.state.steps} setActiveStep={this.setActiveStep} active={this.state.active} completed={this.state.completed} />
        <Container>
          <Fade in={this.state.active == 0}>
            <span className={this.state.active == 0 ? "d-block" : "d-none"}>
              <PickSchools step={this.state.steps[0]} save={this.markCompleted} index={0} />
            </span>
          </Fade>
          <Fade in={this.state.active == 1}>
            <div className={this.state.active == 1 ? "d-block" : "d-none"}>
              <InvestmentAmount step={this.state.steps[1]} save={this.markCompleted} index={1} />
            </div>
          </Fade>
          <Fade in={this.state.active == 2}>
            <div className={this.state.active == 2 ? "d-block" : "d-none"}>
              <InvestmentAmount step={this.state.steps[2]} save={this.markCompleted} index={2} />
            </div>
          </Fade>
          <Fade in={this.state.active == 3}>
            <div className={this.state.active == 3 ? "d-block" : "d-none"}>
              <ConnectBank step={this.state.steps[3]} save={this.markCompleted} index={3}/>
            </div>
          </Fade>
        </Container>
      </Container>
  );
  }
}

export default CreatePlan;