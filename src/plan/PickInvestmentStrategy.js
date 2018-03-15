import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardSubtitle, Row, Col } from 'reactstrap';
import investmentsImage from '../images/investments_icon_2x.png'; // Tell Webpack this JS file uses this image
import { ProcessStepHeader } from './ProcessStepHeader.js';

import { InvestmentsStrategyChart, InvestmentMix, ChangeMixButtons, AgeSlider } from '../charts/InvestmentStrategyChart.js';

class PickInvestmentStrategy extends Component {
  constructor (props) {
    super(props);

    var investmentOptions = []

    switch (this.props.selectedStrategy) {
      case 0:
        investmentOptions = InvestmentMix.conservative;
        break;
      case 1:
        investmentOptions = InvestmentMix.moderate;
        break;
      case 2:
        investmentOptions = InvestmentMix.aggressive;
        break;
      default:
        break;
    }

    this.state = { showStrategyDetails: false, beneficiaryName: "Jason", selectedStrategy: this.props.selectedStrategy, selectedAge: this.props.selectedAge, investmentOptions: investmentOptions, isEditing: false };
    this.changeStrategy = this.changeStrategy.bind(this);
    this.changeAge = this.changeAge.bind(this);
    this.showStrategyDetails = this.showStrategyDetails.bind(this);
  }

  changeStrategy(selectedStrategy) {
    switch (selectedStrategy) {
    case 0: 
        this.setState({ selectedStrategy: selectedStrategy, investmentOptions: InvestmentMix.conservative });
        break;
    case 1:
          this.setState({ selectedStrategy: selectedStrategy, investmentOptions: InvestmentMix.moderate });
          break;
    case 2:
        this.setState({ selectedStrategy: selectedStrategy,  investmentOptions: InvestmentMix.aggressive });
        break;
    default:
        break;
    }
  }

  changeAge(selectedAge) {
    this.setState({ selectedAge: selectedAge.target.value });
  }

  showStrategyDetails() {
    this.setState({showStrategyDetails: !this.state.showStrategyDetails})
  }

  render() {
    return (
    <Card className={this.props.isActive ? "Dashboard-component mt-5" : "Dashboard-component mt-0"}>
      { ProcessStepHeader(this.props.step, investmentsImage, this.props.save, this.props.index) }
			<CardBody >
		    <Row>
		      <Col xs={6} md={3} className="ml-auto align-self-center">
		        <h5 className="font-weight-bold">Selected Strategy:</h5>
		      </Col>
		      <Col xs={6} md={3} className="mr-auto">
		  			<h5 className="bg-light rounded text-center border border-warning font-weight-bold p-3">{this.props.strategyLabels[this.state.selectedStrategy]}</h5>
		      </Col>
		    </Row>
			</CardBody>
      { ChangeMixButtons(this.state.selectedStrategy, this.changeStrategy, this.state.beneficiaryName ) }  
      <CardBody>
        <div className="Investment-mix">
          <InvestmentsStrategyChart investmentSet={this.state.investmentOptions[this.state.selectedAge]} selectedAge={this.state.selectedAge} />
        </div>
       </CardBody>
       <CardBody>
        <Row>
          <Col xs={12} md={6} className="m-auto pt-5">
            <CardSubtitle className="text-center pt-2 pb-2">Use slider to visualize how we autobalance {this.props.beneficiaryName}'s portfolio with  age. </CardSubtitle>
            { AgeSlider(this.state.selectedAge, [...Array(InvestmentMix.ageLabels.length).keys()], InvestmentMix.ageLabels, this.changeAge) }
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
  }
}

PickInvestmentStrategy.propTypes = {
  selectedStrategy: PropTypes.number.isRequired,
  strategies: PropTypes.array.isRequired,
  strategyLabels: PropTypes.array.isRequired,
  strategyDescriptions: PropTypes.array.isRequired
}

export default PickInvestmentStrategy;