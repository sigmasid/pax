import React, { Component } from 'react';
import { Container, Alert, Label, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
//const util = require('util'); //print an object

const SignupAlertMessage = (props) => {
  switch(props.progressValue) {
    case 0:
        return(<Alert color="warning text-center small"><strong>Let's get started!</strong> It will take about 2 minutes to get you on board!</Alert>)
    case 1:
        return(<Alert color="warning text-center small"><strong>First a bit about you!</strong> As the account holder you can add investments, pick an investing strategy & control who gets the funds!</Alert>)
    case 2:
        return(<Alert color="warning text-center small"><strong>Now tell us about the future scholar!</strong> Each account can have one beneficiary (the student) but you can update this at any time from your dashboard.</Alert>)
    case 3:
        return(<Alert color="warning text-center small"><strong>Choose one of 3 portfolios</strong> Each portfolio is diversified & automatically optimized based on beneficiary's age!</Alert>)
    default:
        return(<Alert color="danger text-center small"><strong>Uh oh!</strong> Something went wrong!</Alert>)
	}
};

class Login extends Component {
  	state = {
  		progressValue: 0,
  		isAuthenticated: false
  	}

  	handleSubmit = (e) => {
		this.setState({ isAuthenticated: true });
  	}

  	render() {

    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
	const { isAuthenticated } = this.state

    if (isAuthenticated) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
    <Container className="Container-main" fluid>
      <div className="Signup-form m-auto">
			<SignupAlertMessage />
			<Card className="pt-3">
        <CardHeader tag="h3" color="font-weight-bold text-center"><strong>Welcome Back!</strong></CardHeader>
    		<CardBody>
					<Form onSubmit={this.handleSubmit}>
					  	<FormGroup className="form-row" row>
  	            <Label for="accountEmail" sm={3}>Email</Label>
  	            <Col sm={9}>
					    		<Input name="email" placeholder="email" id="accountEmail" className="form-control" />
				    		</Col>
					    </FormGroup>
					  	<FormGroup className="form-row" row>
	  	            <Label for="accounPassword" sm={3}>Password</Label>
	  	            <Col sm={9}>
					    		<Input name="password" placeholder="password" id="accounPassword" className="form-control"  />
				    		</Col>
					    </FormGroup>
	   					<Button color="warning" onClick={this.handleSubmit} block>Login</Button>
		            	<Row><Col xs={12} className="text-center pt-1"><small>Forgot your password?<Link to={''}> Click here</Link></small></Col></Row>
        			</Form>
        		</CardBody>
        	</Card>
        </div>
		</Container>	
	);
  }
}

export default Login;