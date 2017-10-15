import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardBody, CardTitle, Fade, CardHeader, Media, CardSubtitle, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';
import scholarImage from '../images/scholar_icon_2x.png'; // Tell Webpack this JS file uses this image
import { ProcessStepHeader } from './ProcessStepHeader.js';
import { CollegeSearch } from '../home/CollegeSearch.js';
import CollegeCard from '../home/CollegeCard.js';

class PickSchools extends Component  {
  constructor (props) {
    super(props);
    this.state = { college: '', selectedColleges: [], isComplete: false };
    this.selectCollege = this.selectCollege.bind(this);
    this.removeCollege = this.removeCollege.bind(this);
  }

  selectCollege(college) {
  	this.setState({college: college });
  }

  removeCollege(college) {
	  var array = this.state.selectedColleges.filter(function(currentCollege) {
	    return currentCollege['Name'] !== college['Name'];
	  });

	  this.setState({
	    selectedColleges: array
	  })
  }

  render() {
    var createItem = function(college, index) {
      return(
      	<ListGroupItem key={index}>
      		<Row>
      		<Col xs={10}>{college['Name']}</Col>
      		<Col xs={2}>
      			<Button className="close float-right" onClick={() => this.removeCollege(college)}>
	      		  <span aria-hidden="true">&times;</span>
      		 </Button>
    		 </Col>
    		 </Row>
      	</ListGroupItem>
      );
    }.bind(this);

    return (
    <div>
    <Card className="Dashboard-component mt-5">
      { ProcessStepHeader(this.props.step, scholarImage, this.props.save, this.props.index) }
    	<CardBody>
        <Row>
        <Col xs={12} md={6}>
          <Card className="setup-steps border-0">
            <CardBody>
              <CardTitle className="font-weight-bold text-dark">Browse Colleges</CardTitle>
              <CardSubtitle className="mb-5">Search and add schools to your personalized plan. Take advantage of detailed school snapshots, tuition & financial aid information!</CardSubtitle>    
              <CollegeSearch selectCollege={this.selectCollege} />
              <Fade in={this.state.college !== ''} className="mt-3">
                <div className={this.state.college !== '' ? "bg-white border-top-0" : "d-none"}>
                  <CollegeCard college={this.state.college} />
                </div>
              </Fade>
            </CardBody>
            <Fade in={this.state.college !== ''} className="mt-3">
              <CardFooter className={this.state.college !== '' ? "bg-white border-top-0" : "d-none"}>
                <Button color="warning" block onClick={() => this.setState({collegeList: this.state.selectedColleges.push(this.state.college)})}>Add to List</Button>
              </CardFooter>
            </Fade>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="setup-steps border-0">
            <CardBody>
              <CardTitle className="font-weight-bold">Your Target List</CardTitle>      
              <CardSubtitle>We customize your plan for the schools you select & give you ongoing detailed information for each school</CardSubtitle>    
              <ListGroup className="mt-5 mb-5 h-100">{this.state.selectedColleges.length !== 0 ? this.state.selectedColleges.map(createItem) : null }</ListGroup>
            </CardBody>
          </Card>
        </Col>
        </Row>
    	</CardBody>
    </Card>
    </div>
  );
  }
}

export default PickSchools;