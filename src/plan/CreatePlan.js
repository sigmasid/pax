import React, { Component } from 'react';
import { Container, Fade } from 'reactstrap';

import PickSchools from './PickSchools.js'; // Tell Webpack this JS file uses this image
import PickInvestmentAmount from './PickInvestmentAmount.js'; // Tell Webpack this JS file uses this image
import PickInvestmentStrategy from './PickInvestmentStrategy.js';
import PickBank from './PickBank.js'; // Tell Webpack this JS file uses this image
import PlanSummary from './PlanSummary.js'; // Tell Webpack this JS file uses this image
//const util = require('util'); //print an object

class CreatePlan extends Component  {
  constructor (props) {
    super(props);

    var steps = [{title: "Pick Target Schools", description: "The fun part - will it be your alma mater or another dream school?"},
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
    var strategyDescriptions = 
      ["Our conservative strategy focuses more on capital preservation (reduces chance & magnitude of potential losses) by investing a greater portion of the assets in bond ETFs early on and shifting to safer short term reserves earlier (similar to cash) as " + this.state.beneficiaryName + " gets closer to college age. You get a lower volatility and risk profile at the cost of some upside compared to our moderate & aggressive portfolios",
      "Our moderate strategy uses a blend of stocks and bonds ETFs in the early years that gradually shifts to a heavier bond focus as " + this.state.beneficiaryName + " gets older. This portfolio offers more of the upside from stocks in the earlier years than our conservative strategy and benefits from lower volatility (lower chances of losses) in the later years.",
      "Our aggressive strategy provides the heaviest exposure to stocks (greater upside but greater volatility) in the early years and provides a more gradual shift to bond ETFs as the beneficiary nears college. While you capture more of the upside from stocks, the portfolio is also exposed to greater volatility and risk of losses should the market underperform as " + this.state.beneficiaryName + " nears college age."]

    return (
      <Container fluid className="container-index bg-light pr-0 pl-0" >
        <PlanSummary steps={this.state.steps} setActiveStep={this.setActiveStep} active={this.state.active} completed={this.state.completed} />
        <Container>
          <Fade in={this.state.active === 0}>
            <span className={this.state.active === 0 ? "d-block" : "d-none"}>
              <PickSchools step={this.state.steps[0]} save={this.markCompleted} index={0} />
            </span>
          </Fade>
          <Fade in={this.state.active === 1} >
            <div className={this.state.active === 1 ? "d-block" : "vh-0"}>
              <PickInvestmentStrategy step={this.state.steps[1]} save={this.markCompleted} index={1} isActive={this.state.active === 1 ? true : false} selectedAge={2} selectedStrategy={1} strategies={[0,1,2]} strategyLabels={["Conservative", "Moderate", "Aggressive"]} strategyDescriptions={strategyDescriptions} beneficiaryName="Jason" />
            </div>
          </Fade>
          <Fade in={this.state.active === 2}>
            <div className={this.state.active === 2 ? "d-block" : "d-none"}>
              <PickInvestmentAmount step={this.state.steps[2]} save={this.markCompleted} index={2} />
            </div>
          </Fade>
          <Fade in={this.state.active === 3}>
            <div className={this.state.active === 3 ? "d-block" : "d-none"}>
              <PickBank step={this.state.steps[3]} save={this.markCompleted} index={3}/>
            </div>
          </Fade>
        </Container>
      </Container>
  );
  }
}

export default CreatePlan;