import React, { Component } from 'react';
import { Container, Label, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';
import Recommendations from './Recommendation.js';
import NumberFormat from 'react-number-format';
const util = require('util'); //print an object

function States() {
	return(["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"])
}

class FinancialsStep extends Component {
		constructor (props) {
  		super(props);

    	this.state = { income: undefined, filingStatus: undefined, contribution: undefined };
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleValueChange = this.handleValueChange.bind(this);
		}

		handleSubmit = () => {
			this.props.update(this.state.contribution * 12, this.state.filingStatus, this.state.income);
		}

    handleValueChange = (event, name) => {
      this.setState({
        [name]: event.value
      });
    }

    handleChange = prop => event => {
      this.setState({
        [prop]: event.target.value
      })
    };

    formatNumber = (number) => {
      return <NumberFormat thousandSeparator={true} prefix={'$'} value={number} />
    }

  	render() {
  	return (
		<div className="Signup-form-detail pt-3">
		  	<FormGroup className="form-row pb-3" row>
        <Col xs={12}>
          <Label for="contributionAmount">How much are you planning to contribute each <snap className="font-weight-bold">month?</snap></Label>
          <NumberFormat customInput={Input} thousandSeparator={true} placeholder={0} prefix={'$'} value={this.state.contribution} onValueChange={(values) => {this.handleValueChange(values, 'contribution')}} />
    		</Col>
		    </FormGroup>

        <Label for="filingStatus">What's your tax filing status?</Label>
		  	<FormGroup className="form-row pb-3" row>
        	<Col xs={12}>
		    		<Input type="select" name="filingStatus" id="filingStatus" className="form-control" onChange={this.handleChange('filingStatus')} value={this.state.filingStatus} >
		    			<option key={0} value={'married'}>Married / Joint</option>)}
		    			<option key={1} value={'single'}>Single</option>)}
		    		</Input>
	    		</Col>
		    </FormGroup>

		  	<FormGroup className="form-row pb-3" row>
          <Col xs={12}>
          	<Label for="incomeAmount">What's your <snap className="font-weight-bold">annual</snap> taxable income?</Label>
            <NumberFormat customInput={Input} thousandSeparator={true}  placeholder={0} prefix={'$'} value={this.state.income} onValueChange={(values) => {this.handleValueChange(values, 'income')}} />
	    		</Col>
		    </FormGroup>

				<Button className="Signup-form-button" onClick={this.handleSubmit} block>{ ButtonTitle(this.state.progressValue)}</Button>
				<Button color="link" onClick={this.props.startOver} block>start over</Button>

		</div>	
	);
  }
}

class StateStep extends Component {
	constructor (props) {
  	super(props);
  	this.state = {selectedState: States()[0]};
    this.handleSelectState = this.handleSelectState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSelectState(event) {
		this.setState({selectedState: event.target.value})
	}

	handleSubmit() {
		this.props.update(this.state.selectedState);
	}

	render() {
    return (
		<div className="Signup-form-detail pt-3">
		  	<FormGroup className="form-row pb-3" row>
          <Col md={12}>
            <Label for="accountFirstName">Select Your State of Residence</Label>
		    		<Input type="select" placeholder="state" name="accountState" id="accountState" className="form-control" onChange={this.handleSelectState} >
		    			{States().map(state => <option key={state}>{state}</option>)}
		    		</Input>
		    	</Col>
		    </FormGroup>
				<Button className="Signup-form-button" onClick={this.handleSubmit} block>Next</Button>
		</div>	
	);
  }
}

const AlertMessage = (props) => {
  switch(props.progressValue) {
    case 0:
        return(<CardHeader tag="h3" color="font-weight-bold text-center">
        					<strong>Where Do You Live?</strong> <br/>
        					<small className="text-secondary">Some states offer unique tax incentives to choosing an in-state plan</small>
        				</CardHeader>
        			)
    case 1:
        return(<CardHeader tag="h3" color="font-weight-bold text-center">
        					<strong>Your Finances</strong> <br/>
        					<small className="text-secondary">This helps us better estimate of available tax benefits!</small>
        				</CardHeader>
        			)
    case 2:
        return(<CardHeader tag="h3" color="font-weight-bold text-center">
        					<strong>Recommendations</strong> <br/>
        					<small className="text-secondary">Here's our recommendation based on what you told us so far.</small>
        				</CardHeader>
        			)
    default:
        return(<CardHeader tag="h3" color="font-weight-bold text-center">
        					<strong>Uh oh!</strong> <br/><small className="text-secondary">Something went wrong!</small>
        				</CardHeader>
        			)
	}
};

const PickPlanSteps = (props) => {
  switch(props.progressValue) {
    case 0:
        return <StateStep update={props.updateStateFunc} startOver={props.startOver} />;
    case 1:
        return <FinancialsStep update={props.updateFinancialsFunc} startOver={props.startOver} />;
    case 2:
        return <Recommendations inputs={props.inputs} startOver={props.startOver} />;
    default:
        return <div></div>;
	}
};

const ButtonTitle = (props) => {
  return(props !== 1 ? "Next" : "See Recommendations");
};

class PickPlan extends Component {
		constructor (props) {
  		super(props);
  		var inputs = {};

    	this.state = { progressValue: 0, inputs: inputs };
    	this.updateSelectedState = this.updateSelectedState.bind(this);
    	this.updateFinancials = this.updateFinancials.bind(this);
    	this.startOver = this.startOver.bind(this);
		}

		updateSelectedState(name) {
  		var newInputs = {};
  		newInputs["selectedState"] = name;

  		this.setState({inputs: newInputs, progressValue: this.state.progressValue + 1});
  	}

  	updateFinancials(contribution, filingStatus, income) {
  		var newInputs = {};
  		newInputs["selectedState"] = this.state.inputs["selectedState"];
  		newInputs["contribution"] = contribution;
  		newInputs["filingStatus"] = filingStatus;
  		newInputs["income"] = income;
  		
  		this.setState({inputs: newInputs, progressValue: this.state.progressValue + 1});
  	}

  	startOver() {
  		this.setState({progressValue: 0});
  	}

  	render() {
    return (
		<Container className="Container-main" fluid>
			<div className="Signup-form m-auto">
			<Card>
				<AlertMessage progressValue={this.state.progressValue} />
	  		<CardBody> 
					<Form onSubmit={this.handleSubmit}>					
	  				<PickPlanSteps startOver={this.startOver} progressValue={this.state.progressValue} updateStateFunc={this.updateSelectedState} updateFinancialsFunc={this.updateFinancials} inputs={this.state.inputs} />
	  			</Form>
	  		</CardBody>
    	</Card>
    	</div>
		</Container>	
	);
  }
}

export default PickPlan;