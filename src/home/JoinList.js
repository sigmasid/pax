import React, { Component } from 'react';
import { Row, Col, Input, Form, FormGroup, Button, FormFeedback } from 'reactstrap';

function saveEmail() {

}

function emailValidator(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class JoinList extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', error: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  	emailValidator(this.state.email) ? this.setState({ error: '' }) : this.setState({ error: 'Please enter a valid email' });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  render() {
  	return(
  	<div className="join-section bg-light pt-5 pb-5">
	  	<Row>
	      <Col xs={12} md={6} className="m-auto text-center pb-2">
	      	<p className="text-secondary">We are launching soon! Get your spot in-line by entering your email</p>
	      </Col>
	  	</Row>
			<Row className="align-items-center">
				<Col xs={12} md={6} className="m-auto">
					<Form inline onSubmit={this.handleSubmit}>
						<FormGroup >
		          <Input className="w-100" placeholder="scholar@pax.com" size="lg" valid={this.state.error === '' ? true : false } value={this.state.email} onChange={this.handleChange} />
		       	</FormGroup>
	         	<Button color="warning" size="lg" className="mb-3 mb-sm-0">Join</Button>
          	<FormFeedback>{this.state.error}</FormFeedback>
         </Form>
				</Col>
	    </Row>
    </div>
  	)
  }
}

export default JoinList;