/* esli nt-disable react-in-jsx-scope */
import React, { Component } from 'react';
import { Container, Button, Card, Media, CardSubtitle, CardBody, CardText, CardFooter, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import AccountSection from './dashboard/Account.js'; // Tell Webpack this JS file uses this image
import BeneficiarySection from './dashboard/Beneficiary.js'; // Tell Webpack this JS file uses this image
import InvestmentsSection from './dashboard/Investments.js'; // Tell Webpack this JS file uses this image
import InitialSetupSection from './dashboard/InitialSetup.js'; // Tell Webpack this JS file uses this image

import bankImage from './images/bank_icon_2x.png'; // Tell Webpack this JS file uses this image
import referralImage from './images/piggy_bank_2x.png'; // Tell Webpack this JS file uses this image
import summaryImage from './images/summary_icon_2x.png'; // Tell Webpack this JS file uses this image

import editImage from './images/edit_icon_2x.png'; // Tell Webpack this JS file uses this image
import doneImage from './images/done_icon_2x.png'; // Tell Webpack this JS file uses this image
//const util = require('util'); //print an object

const Balance = ({ balance, change }) => {
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return (
    <Card className="Dashboard-component mb-5 mt-5">
      <CardBody>
      <Row>
        <Col xs={12}>
        <Media>
            <Media left>
              <Media object src={summaryImage} alt="Portfolio Summary" />
            </Media>
            <Media body>
              <Media heading>Portfolio Summary</Media>
              <CardSubtitle>Here's your account snapshot, you can see more details or make changes below</CardSubtitle>
            </Media>
          </Media>
        </Col>
      </Row>
      </CardBody>
      <CardBody>
        <Row>
        <Col xs={12} sm={4} md={3} className="pb-5 pb-sm-0 m-auto">
          <h4 className="text-center">Portfolio Balance:</h4>
          <h4 className="text-center rounded font-weight-bold p-2 bg-warning">{ formatter.format(balance) }</h4>
        </Col>
        <Col xs={12} sm={4} md={3} className="m-auto">
          <h4 className="text-center">Today's Gain / Loss:</h4>
          <h4 className={change > 0 ? "text-center rounded font-weight-bold bg-success p-2 text-white" : "text-center font-weight-bold bg-danger p-2 text-white"}>{change > 0 ? "+" : ""}{ formatter.format(change) }</h4>
        </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired
}

class LinkedAccounts extends Component {
  constructor (props) {
    super(props);

    this.state = { rSelected: [], isEditing: false };
    this.changeMode = this.changeMode.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  changeMode(event) {
    this.setState({isEditing: !this.state.isEditing});
  }

  render() {
    return (
    <Card className="Dashboard-component mb-5 mt-5">
      <CardBody>
      <Row>
        <Col xs={12} sm={9} md={8}>
        <Media>
            <Media left>
              <Media object src={bankImage} alt="Linked Bank Accounts" />
            </Media>
            <Media body>
              <Media heading>Linked Bank Accounts</Media>
              <CardSubtitle>This is the account that is used to fund your investment choices</CardSubtitle>
            </Media>
          </Media>
        </Col>
        <Col sm={3} md={4} className="text-right d-sm-none">
          <Button className="Update-button btn-circle btn-lg" color={this.state.isEditing ? "success" : "warning"} onClick={this.changeMode} size="sm">
            <img src={this.state.isEditing ? doneImage : editImage } alt="..." />
            <span className="d-sm-none">{this.state.isEditing ? "done" : "update"}</span>
          </Button>
        </Col>
      </Row>
      </CardBody>
      <CardBody className="text-center">
        <CardText>You current currently don't have any linked accounts</CardText>
        <Button>Add Funding Source</Button>
      </CardBody>
      <CardFooter className="d-sm-none">
        <Button block color="success" onClick={this.changeMode}>{this.state.isEditing ? "done" : "edit"}</Button>
      </CardFooter>
    </Card>
  );
  }
}

const ReferralLink = ({ link }) => {
  return(
  <Card className="Dashboard-component mb-5 mt-5">
    <CardBody>
    <Row>
      <Col xs={12} sm={10}>
      <Media>
          <Media left>
            <Media object src={referralImage} alt="ReferralLink" />
          </Media>
          <Media body>
            <Media heading>Referral Link</Media>
            <CardSubtitle>Better than gifts! Share this unique link with friends & family, include on all invites so everyone can contribute to your scholar's college fund</CardSubtitle>
          </Media>
        </Media>
      </Col>
    </Row>
    </CardBody>
    <CardBody className="text-center">
      <p className="lead">{ link }</p>
      <Button>Copy Link</Button>
    </CardBody>
  </Card>);
}

ReferralLink.propTypes = {
  link: PropTypes.string.isRequired
}

class Dashboard extends Component {
    constructor (props) {
    super(props);

    this.state = { beneficiaryName: "Jason" };
  }

  render() {

    var strategyDescriptions = 
      ["Our conservative strategy focuses more on capital preservation (reduces chance & magnitude of potential losses) by investing a greater portion of the assets in bond ETFs early on and shifting to safer short term reserves earlier (similar to cash) as " + this.state.beneficiaryName + " gets closer to college age. You get a lower volatility and risk profile at the cost of some upside compared to our moderate & aggressive portfolios",
      "Our moderate strategy uses a blend of stocks and bonds ETFs in the early years that gradually shifts to a heavier bond focus as " + this.state.beneficiaryName + " gets older. This portfolio offers more of the upside from stocks in the earlier years than our conservative strategy and benefits from lower volatility (lower chances of losses) in the later years.",
      "Our aggressive strategy provides the heaviest exposure to stocks (greater upside but greater volatility) in the early years and provides a more gradual shift to bond ETFs as the beneficiary nears college. While you capture more of the upside from stocks, the portfolio is also exposed to greater volatility and risk of losses should the market underperform as " + this.state.beneficiaryName + " nears college age."]
    return (
    <Container className="Container-main" fluid>
      <Container className="Dashboard-container">
        <InitialSetupSection />
        <Balance balance={5000} change={100}/>
        <InvestmentsSection selectedAge={2} selectedStrategy={1} strategies={[0,1,2]} strategyLabels={["Conservative", "Moderate", "Aggressive"]} strategyDescriptions={strategyDescriptions} beneficiaryName={this.state.beneficiaryName} />
        <LinkedAccounts />
        <ReferralLink link={"http://referralLink"} />
        <BeneficiarySection />
        <AccountSection />
      </Container>
    </Container>  
  );
  }
}

export default Dashboard;