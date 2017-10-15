import React, { Component } from 'react';
import { Container, Progress, Alert, Label, Row, Col, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Input, Button } from 'reactstrap';
import { Link} from 'react-router-dom'
//const util = require('util'); //print an object

function SignupProgressPercent(props) {
	return (33.3333 + props.progressValue * 33.3333);
}

const SignupProgress = (props) => {
  	return (
	<div className="Signup-progress">
	  	 <Row className="pb-2">
	  		<Col xs={4} className={props.progressValue === 0 ? "text-center text-warning font-weight-bold" : "text-center text-secondary"}>Account</Col>
	  		<Col xs={4} className={props.progressValue === 1 ? "text-center text-warning font-weight-bold" : "text-center text-secondary"}>Personal</Col>
	  		<Col xs={4} className={props.progressValue === 2 ? "text-center text-warning font-weight-bold" : "text-center text-secondary"}>Beneficiary</Col>
	  	</Row>
	  	<Row>
	  		<Col xs={12}>
	      		<Progress value={ SignupProgressPercent(props) } color="warning" />
	      	</Col>
	  	</Row>
  	</div>
  );
};

function DaysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}

function States() {
	return(["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AS","DC","FM","GU","MH","MP","PW","PR","VI"])
}

class SignupBeneficiary extends Component {
	constructor (props) {
    	super(props);

    	this.state = 
    	{ selectedMonth: 1,
    	  selectedYear: 2017,
    	  beneficiarySSN: ""
    	};

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSelectMonth = this.handleSelectMonth.bind(this);
	    this.handleSelectYear = this.handleSelectYear.bind(this);
  	}

  	handleSelectMonth(event) {
		this.setState({selectedMonth: event.target.value});
  	}

  	handleSelectYear(event) {
		this.setState({selectedYear: event.target.value});
  	}

  	handleChange(event) {
  		var stringNum = event.target.value.toString();

  		if (stringNum.length === 9) {
	  		var x = stringNum.replace(/\D/g, '').match(/(\d{3})(\d{2})(\d{4})/);
	  		var formattedSSN = x[1] + '-' + x[2] + '-' + x[3];
	    	this.setState({beneficiarySSN: formattedSSN});
    	} else {
	    	this.setState({beneficiarySSN: stringNum});
    	}
  	}

  	render() {
    	return (
		<div className="Signup-form-detail pt-3">
		  	<FormGroup className="form-row pb-3" row>
  	            <Col xs={12}>
  	            <Label for="beneficiaryName">Legal Name</Label>
	    		<Input name="name" placeholder="beneficiary name" id="beneficiaryName" className="form-control" />
	    		</Col>
		    </FormGroup>

            <Label for="beneficiaryBirthday">Birthday</Label>
		  	<FormGroup className="form-row pb-3" row>
  	            <Col xs={4}>
		    		<Input type="select" name="beneficiaryBirthMonth" placeholder="month" id="beneficiaryBirthMonth" className="form-control" onChange={this.handleSelectMonth}>
		    			{[...Array(12).keys()].map(month => <option key={month} value={month}>{month + 1}</option>)}
		    		</Input>
		    	</Col>
  	            <Col xs={4}>
		    		<Input type="select" name="beneficiaryBirthDate" placeholder="date" id="beneficiaryBirthDate" className="form-control">
		    			{[...Array(DaysInMonth(this.state.selectedMonth,this.state.selectedYear)).keys()].map(day => <option key={day} value={day + 1}>{day + 1}</option>)}
		    		</Input>
		    	</Col>
		    	<Col xs={4}>
		    		<Input type="select" name="beneficiaryBirthYear" placeholder="year" id="beneficiaryBirthYear" className="form-control" onChange={this.handleSelectYear} >
		    			{[...Array(100).keys()].map(year => <option key={year} value={2017 - year}>{2017 - year}</option>)}
		    		</Input>
		    	</Col>
		    </FormGroup>

		  	<FormGroup className="form-row pb-3" row>
  	            <Col xs={12}>
  	            <Label for="beneficiarySSN">Social Security Number</Label>
	    		<Input name="beneficiarySSN" placeholder="" id="beneficiarySSN1" className="form-control" onChange={this.handleChange} value={this.state.beneficiarySSN} />
	    		</Col>
		    </FormGroup>
		</div>	
	);
  }
}

class SignupEmail extends Component {
  render() {
    return (
		<div className="Signup-form-detail pt-3">
		  	<FormGroup className="form-row pb-3" row>
  	            <Col xs={12}>
  	            <Label for="accountEmail">Email</Label>
	    		<Input name="email" placeholder="email" id="accountEmail" className="form-control" />
	    		</Col>
		    </FormGroup>

		  	<FormGroup className="form-row pb-3" row>
  	            <Col xs={12}>
  	            <Label for="accounPassword">Password</Label>
	    		<Input name="password" placeholder="password" id="accounPassword" className="form-control"  />
	    		</Col>
		    </FormGroup>
		</div>	
	);
  }
}

class SignupProfile extends Component {
	constructor (props) {
    	super(props);

    	this.state = 
    	{ selectedMonth: 1,
    	  selectedYear: 2017
    	};

	    this.handleSelectMonth = this.handleSelectMonth.bind(this);
	    this.handleSelectYear = this.handleSelectYear.bind(this);
  	}

  	handleSelectMonth(event) {
		this.setState({selectedMonth: event.target.value});
  	}

  	handleSelectYear(event) {
		this.setState({selectedYear: event.target.value});
  	}

	render() {
    return (
		<div className="Signup-form-detail pt-3">
		  	<FormGroup className="form-row pb-3" row>
  	            <Col md={12}>
	  	            <Label for="accountFirstName">Full Name</Label>
		    		<Input name="name" placeholder="first name" id="accountFirstName" className="form-control"  />
		    	</Col>
		    </FormGroup>

		  	<FormGroup className="pb-3">
  	            <Label for="address">Street Address</Label>
	    		<Input type="name" placeholder="street address" id="ssn" className="form-control"  />
  	        </FormGroup>

		  	<FormGroup className="form-row pb-sm-3" row>
  	            <Col xs={12} md={6} className="pb-4 pb-sm-0">
	  	            <Label for="accountCity">City</Label>
		    		<Input name="accountCity" placeholder="city" id="accountCity" className="form-control"  />
		    	</Col>
  	            <Col md={2} xs={4} className="pb-3 pb-sm-0">
	  	            <Label for="accountState">State</Label>
		    		<Input type="select" placeholder="state" name="accountState" id="accountState" className="form-control" >
		    			{States().map(state => <option key={state}>{state}</option>)}
		    		</Input>
		    	</Col>
	            <Col md={4} xs={8}>
	  	            <Label for="accountZip">Zip</Label>
		    		<Input type="number" placeholder="zip code" name="accountZip" id="accountZip" className="form-control"  />
		    	</Col>
		    </FormGroup>

            <Label for="accountHolderBirthday">Birthday</Label>
		  	<FormGroup className="form-row pb-3" row>
  	            <Col xs={4}>
		    		<Input type="select" name="accountHolderBirthMonth" placeholder="month" id="accountHolderBirthMonth" className="form-control" onChange={this.handleSelectMonth}>
		    			{[...Array(12).keys()].map(month => <option key={month} value={month}>{month + 1}</option>)}
	    			</Input>
		    	</Col>
  	            <Col xs={4}>
		    		<Input type="select" name="accountHolderBirthDate" placeholder="date" id="accountHolderBirthDate" className="form-control">
		    			{[...Array(DaysInMonth(this.state.selectedMonth,this.state.selectedYear)).keys()].map(day => <option key={day} value={day + 1}>{day + 1}</option>)}
	    			</Input>
		    	</Col>
		    	<Col xs={4}>
		    		<Input type="select" name="accountHolderBirthYear" placeholder="year" id="accountHolderBirthYear" className="form-control" onChange={this.handleSelectYear}>
		    			{[...Array(100).keys()].map(year => <option key={year} value={2017 - year}>{2017 - year}</option>)}
	    			</Input>
		    	</Col>
		    </FormGroup>
		</div>	
	);
  }
}

const SignupAlertMessage = (props) => {
  switch(props.progressValue) {
    case 0:
        return(<Alert color="warning text-center"><strong>Let's get started!</strong> It will take about 2 minutes to get you on board!</Alert>)
    case 1:
        return(<Alert color="warning text-center"><strong>First a bit about you!</strong> As the account holder you can add investments, pick an investing strategy & control who gets the funds!</Alert>)
    case 2:
        return(<Alert color="warning text-center"><strong>Finally tell us about the future scholar!</strong> Each account has one beneficiary (the student) but you can update this at any time from your dashboard.</Alert>)
    case 3:
        return(<Alert color="warning text-center"><strong>Choose one of 3 portfolios</strong> Each portfolio is diversified & automatically optimized based on beneficiary's age!</Alert>)
    default:
        return(<Alert color="danger text-center"><strong>Uh oh!</strong> Something went wrong!</Alert>)
	}
};

const SignupScreenDetail = (props) => {
  switch(props.progressValue) {
    case 0:
        return <SignupEmail />;
    case 1:
        return <SignupProfile />;
    case 2:
        return <SignupBeneficiary />;
    default:
        return <div></div>;
	}
};

const SignupButtonTitle = (props) => {
  return(props !== 2 ? "Next" : "Done");
};

class Signup extends Component {
  	state = {
  		progressValue: 0
  	}

  	handleSubmit = (e) => {
  		if (this.state.progressValue < 2) {
    		this.setState({ progressValue: this.state.progressValue + 1 });
    	}
  	}

  	render() {
    return (
		<Container className="Container-main" fluid>
			<div className="Signup-form m-auto">
			<SignupAlertMessage progressValue={this.state.progressValue} />
			<Card>
				<CardHeader>
					<SignupProgress progressValue={this.state.progressValue} />
				</CardHeader>
        		<CardBody> 
					<Form onSubmit={this.handleSubmit}>
        				<SignupScreenDetail progressValue={this.state.progressValue} />
	   					<Button color="warning" onClick={this.handleSubmit} block>{ SignupButtonTitle(this.state.progressValue)}</Button>
		            	<Row><Col xs={12} className="text-center pt-2">Already have an account?<Link to={'/login'}> Login here</Link></Col></Row>
        			</Form>
        		</CardBody>
        		<CardFooter className="text-center">
			        <FormGroup check>
			          <Label check>
			            <Input type="checkbox" />{' '}
			            <small>Agree to our terms of service</small>
			          </Label>
			        </FormGroup>
        		</CardFooter>
        	</Card>
        	</div>
		</Container>	
	);
  }
}

export default Signup;