import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade, Card, CardBody, CardHeader, CardTitle, ButtonGroup, Button, Media, CardSubtitle, CardFooter, Row, Col } from 'reactstrap';
import referralImage from '../images/piggy_bank_2x.png'; // Tell Webpack this JS file uses this image
import { ProcessStepHeader } from './ProcessStepHeader.js';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

class InvestmentAmount extends Component  {
  constructor (props) {
    super(props);

    this.state = { selectedInvestment: 0, isEditing: false, isComplete: false };
    this.changeMode = this.changeMode.bind(this);
  }

  changeMode(event) {
  	var isComplete = this.state.selectedInvestment !== 0 ? true : false; 
    this.setState({isEditing: !this.state.isEditing, isComplete: isComplete });
  }

  render() {
  return (
    <Card className="Dashboard-component mt-5">
      { ProcessStepHeader(this.props.step, referralImage, this.props.save, this.props.index) }
    	<CardBody >
        <Row>
          <Col xs={6} md={3} className="ml-auto align-self-center">
            <h5 className="font-weight-bold">Selected Investment:</h5>
          </Col>
          <Col xs={6} md={3} className="mr-auto">
      			<h5 className="bg-light rounded text-center border border-warning font-weight-bold p-3">{formatter.format(this.state.selectedInvestment)}</h5>
          </Col>
        </Row>
    	</CardBody>
    	<CardBody >
        <CardSubtitle className="pb-2">Pick a Monthly Investment Amount:</CardSubtitle>
	    	<ButtonGroup className="d-none d-md-flex btn-group-justified rounded">
	    		<Button className="w-100" color={this.state.selectedInvestment === 10 ? "warning" : "light"} onClick={() => this.setState({selectedInvestment: 10})} size="lg">$10</Button>
	    		<Button className="w-100" color={this.state.selectedInvestment === 25 ? "warning" : "light"} onClick={() => this.setState({selectedInvestment: 25})} size="lg" >$25</Button>
	    		<Button className="w-100" color={this.state.selectedInvestment === 50 ? "warning" : "light"} onClick={() => this.setState({selectedInvestment: 50})} size="lg">$50</Button>
	    		<Button className="w-100" color={this.state.selectedInvestment === 100 ? "warning" : "light"} onClick={() => this.setState({selectedInvestment: 100})} size="lg">$100</Button>
	    		<Button className="w-100" color={this.state.selectedInvestment === 150 ? "warning" : "light"} onClick={() => this.setState({selectedInvestment: 150})} size="lg">$150</Button>
	    		<Button className="w-100" color={this.state.selectedInvestment === 200 ? "warning" : "light"} onClick={() => this.setState({selectedInvestment: 200})} size="lg">$200</Button>
	    		<Button className="w-100" color={this.state.selectedInvestment === 250 ? "warning" : "light"} onClick={() => this.setState({selectedInvestment: 250})} size="lg">$250</Button>
	    	</ButtonGroup>
        <ButtonGroup vertical className="w-100 d-block d-md-none">
          <Button outline color={this.state.selectedInvestment === 10 ? "warning" : "secondary"} onClick={() => this.setState({selectedInvestment: 10})} active={this.state.selectedInvestment === 10} size="lg">$10</Button>
          <Button outline color={this.state.selectedInvestment === 25 ? "warning" : "secondary"}  onClick={() => this.setState({selectedInvestment: 25})} active={this.state.selectedInvestment === 25} size="lg" >$25</Button>
          <Button outline color={this.state.selectedInvestment === 50 ? "warning" : "secondary"} onClick={() => this.setState({selectedInvestment: 50})} active={this.state.selectedInvestment === 50} size="lg">$50</Button>
          <Button outline color={this.state.selectedInvestment === 100 ? "warning" : "secondary"} onClick={() => this.setState({selectedInvestment: 100})} active={this.state.selectedInvestment === 100} size="lg">$100</Button>
          <Button outline color={this.state.selectedInvestment === 150 ? "warning" : "secondary"} onClick={() => this.setState({selectedInvestment: 150})} active={this.state.selectedInvestment === 150} size="lg">$150</Button>
          <Button outline color={this.state.selectedInvestment === 200 ? "warning" : "secondary"} onClick={() => this.setState({selectedInvestment: 200})} active={this.state.selectedInvestment === 200} size="lg">$200</Button>
          <Button outline color={this.state.selectedInvestment === 250 ? "warning" : "secondary"} onClick={() => this.setState({selectedInvestment: 250})} active={this.state.selectedInvestment === 250} size="lg">$250</Button>
        </ButtonGroup>
    	</CardBody>
    </Card>
  );
	}
}

export default InvestmentAmount;