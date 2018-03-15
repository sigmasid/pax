import React, { Component } from 'react';
import { Fade, Card, CardBody, CardTitle, Row, Col, Input, Form, FormGroup, Button, FormFeedback, UncontrolledAlert } from 'reactstrap';
import * as firebase from "firebase";
import 'firebase/firestore';
import closeIcon from '../images/close-button.png'; // Tell Webpack this JS file uses this image

function emailValidator(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class JoinList extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', error: undefined, success: undefined, closed: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
  }

  saveEmail(email) {
    var db = firebase.firestore();
    var self = this;
    this.setState({processing: true});

    db.collection("signups").add({
      email: email
    })
    .then(function(docRef) {
      console.log("successfully added email");
      self.setState({success: true});
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  	emailValidator(this.state.email) ? this.saveEmail(this.state.email) : this.setState({ error: 'Please enter a valid email' });
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  handleClose = () => {
    this.setState({closed: true})
  }

  render() {
    if (this.state.success === true) {
      return(
        <Fade in={this.state.success === true}>
          <Row className="join-section fixed-bottom bg-success">
              <Col xs={6} className="m-auto">
                <UncontrolledAlert color="success" className="p-4 mb-0 bg-none text-white border-0">
                  Congrats! You will be first to know once we launch
                </UncontrolledAlert>
              </Col>
          </Row>
        </Fade>
      )
    }

    var joinSection = <Row className="join-section fixed-bottom Pax-accent">
                        <Col xs={10} md={8} className="ml-auto m-md-auto">
                          <Card className="bg-none border-0">
                           <CardBody className="align-items-center">
                             <Button color="bg-none" size="lg" className="mt-2 mt-md-0 close-button" onClick={() => this.handleClose()} >
                                <img src={closeIcon} alt="Close Join"/>
                             </Button>
                             <CardTitle className="join-text text-center d-md-block d-none ">Join the list and you'll be the first to know once we launch!</CardTitle>
                              <Form inline onSubmit={this.handleSubmit}>
                              <FormGroup className="pl-3 pl-md-0 pr-2 mb-0">
                                <Input className="w-100 border-0" valid={this.state.error ? true : undefined} placeholder="scholar@pax.com" size="lg" value={this.state.email} onChange={this.handleChange} />
                              </FormGroup>
                              <Button color="none" disabled={this.state.processing === true ? true : false}>{window.innerWidth < 960 ? "join list" : "join"}</Button>
                              <FormFeedback className={this.state.error !=='' ? "d-block" : "d-none"}>{this.state.error}</FormFeedback>
                            </Form>
                           </CardBody>
                          </Card>
                        </Col>
                      </Row>

  	return(
    !this.state.closed && joinSection
  	)
  }
}

export default JoinList;