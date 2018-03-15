import React, { Component } from 'react'
import SavingsCalculator from './home/SavingsCalculator.js'; 
import CollegePickerSection from './home/CollegePicker.js'; 
import ContributionSection from './home/ContributionOptions.js'; 
import PaxSection from './home/PaxAdvantage.js'; 
import IntroSection from './home/IntroSection.js'; 

/**
const HighCostDivider1 =
  <Row className="cost-surprise bg-light text-black pb-md-5 pt-md-5 pb-2 pt-2">
    <Col xs={12} xl={8} className="mx-auto">
      <h2 className="cost-surprise-text text-center font-weight-bold">College costs are increasing at 2x rate of inflation! Let's see how much their 'dream college' will likely cost.</h2>
    </Col>
  </Row>

const HighCostDivider2 =
  <Row className="cost-surprise bg-light text-black pb-md-5 pt-md-5 pb-2 pt-2">
    <Col xs={12} xl={8} className="mx-auto">
      <h2 className="cost-surprise-text text-center font-weight-bold">Yes... It's a big number! <br/>but we have the secret to reaching your savings goals!</h2>
    </Col>
  </Row>
**/

class Home extends Component {
  render() {
  	return(
  		<div className="container-index">
        <IntroSection />
        <CollegePickerSection />
        <SavingsCalculator />
        <ContributionSection />
        <PaxSection />
        {/* <JoinSection /> */}
  		</div>
  	)
  }
}

export default Home;