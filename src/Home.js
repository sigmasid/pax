import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import SavingsCalculator from './home/SavingsCalculator.js'; 
import CollegePickerSection from './home/CollegePicker.js'; 
import ContributionSection from './home/ContributionOptions.js'; 
import PaxSection from './home/PaxAdvantage.js'; 
import IntroSection from './home/IntroSection.js'; 
import JoinSection from './home/JoinList.js'; 

const HighCostDivider =
  <Row className="cost-surprise text-black pb-md-5 pt-md-5 pb-2 pt-2">
    <Col xs={12} xl={8} className="mx-auto">
      <h2 className="cost-surprise-text text-center font-weight-bold">Yes... It's a big number! <br/>but don't worry - we have the secret to reaching your savings goals!</h2>
    </Col>
  </Row>

class Home extends Component {
  render() {
  	return(
  		<div className="Container-index">
        <IntroSection />
        <CollegePickerSection />
        { HighCostDivider }
        <SavingsCalculator />
        <ContributionSection />
        <PaxSection />
        <JoinSection />
  		</div>
  	)
  }
}

export default Home;