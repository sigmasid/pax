import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade, Card, CardBody, Row, Col, Button, Media, CardSubtitle,  CardFooter } from 'reactstrap';
import { InvestmentsStrategyChart, InvestmentMix, ChangeMixButtons, AgeSlider } from '../charts/InvestmentStrategyChart.js';

import investmentsImage from '../images/investments_icon_2x.png'; // Tell Webpack this JS file uses this image
import editImage from '../images/edit_icon_2x.png'; // Tell Webpack this JS file uses this image
import doneImage from '../images/done_icon_2x.png'; // Tell Webpack this JS file uses this image

//const util = require('util'); //print an object

class Investments extends Component {
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

    this.state = { showStrategyDetails: false, showAgeSlider: false, selectedStrategy: this.props.selectedStrategy, selectedAge: this.props.selectedAge, investmentOptions: investmentOptions, isEditing: false };
    this.changeStrategy = this.changeStrategy.bind(this);
    this.changeAge = this.changeAge.bind(this);
    this.changeMode = this.changeMode.bind(this);
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

  changeMode(event) {
    this.setState({isEditing: !this.state.isEditing, showAgeSlider: !this.state.isEditing });
  }

  showStrategyDetails() {
    this.setState({showStrategyDetails: !this.state.showStrategyDetails})
  }

  render() {

    var changeMixButtons =
      <Fade in={this.state.isEditing}>
        <div className={this.state.isEditing ? "d-block" : "d-none"}>
          { ChangeMixButtons(this.state.selectedStrategy, this.changeStrategy, this.props.beneficiaryName ) }  
        </div>
      </Fade>
    
    return (
    <Card className="Dashboard-component mb-5 mt-5">
      <CardBody>
        <Row>
          <Col xs={12} sm={9} md={8}>
          <Media>
            <Media left>
              <Media object src={investmentsImage} alt="Generic placeholder image" />
            </Media>
            <Media body>
              <Media heading>
                Investments
              </Media>
              <CardSubtitle>We use the beneficiary's birthday to rebalance the portfolio to a diversified, age-appropriate mix</CardSubtitle>
            </Media>
          </Media>
          </Col>
          <Col sm={3} md={4} className="text-right d-none d-sm-block">
            <Button className="Update-button btn-circle btn-lg" color={this.state.isEditing ? "success" : "warning"} onClick={this.changeMode} size="sm">
              <img src={this.state.isEditing ? doneImage : editImage } alt="..." />
              <span className="d-sm-none">{this.state.isEditing ? "done" : "update"}</span>
            </Button>
          </Col>
        </Row>
      </CardBody>
      <CardBody className="text-center row">
        <Col xs={12} sm={4} md={3} className="m-auto">
          <h4 className="text-center">{this.state.isEditing ? "New Strategy:" : "Selected Strategy:"}</h4>
          <h4 className="bg-warning p-2 rounded strong font-weight-bold">{ this.props.strategyLabels[this.state.selectedStrategy] }</h4>
        </Col>
        <Col xs={12} sm={4} md={3} className="m-auto">
          <h4 className="text-center">Optimized for Age:</h4>
          <h4 className="text-center bg-warning p-2 rounded font-weight-bold">{ InvestmentMix.ageLabels[this.props.selectedAge] }</h4>
        </Col>
      </CardBody>
      { changeMixButtons }
      <CardBody>
        <div className="Investment-mix">
          <InvestmentsStrategyChart investmentSet={this.state.investmentOptions[this.state.selectedAge]} selectedAge={this.state.selectedAge} />
        </div>
      </CardBody>
      <CardBody>
        <Row>
          <Col xs={12} md={6} className="m-auto">
            <CardSubtitle className="text-center pt-2 pb-2">Use slider to visualize how we autobalance {this.props.beneficiaryName}'s portfolio with  age. </CardSubtitle>
            { AgeSlider(this.state.selectedAge, [...Array(InvestmentMix.ageLabels.length).keys()], InvestmentMix.ageLabels, this.changeAge) }
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="d-sm-none">
        <Button block color="success" onClick={this.changeMode}>{this.state.isEditing ? "done" : "edit"}</Button>
      </CardFooter>
    </Card>
  );
  }
}

Investments.propTypes = {
  selectedStrategy: PropTypes.number.isRequired,
  strategies: PropTypes.array.isRequired,
  strategyLabels: PropTypes.array.isRequired,
  strategyDescriptions: PropTypes.array.isRequired
}

export default Investments;
