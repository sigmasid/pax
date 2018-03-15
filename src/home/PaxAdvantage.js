import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import doneImage from '../images/done_single_2x.png'; // Tell Webpack this JS file uses this image

class PaxAdvantage extends Component {
	render() {
		var simpleList = ["2 Min On-Boarding", "Guide to Best Savings Plans", "Personalized Goals Dashboard", "Automated Account Reviews", "Micro Investing Options", "Friends + Family Contributions"];

    var createItem = function(advantage, index) {
      return(
        <ListGroupItem key={index} action className="text-left">
          <Button className="btn-circle mr-3" color="white" disabled><img className="img-fluid" src={doneImage } alt="..." /></Button>
        		<span className="text-secondary">{advantage}</span>
        </ListGroupItem>
    	)};

		return(
				<Row className="Home-section bg-light">
					<Col xs={12} lg={8} className="ml-auto text-center align-self-center">
						<Card className="border-0">
							<CardBody>
								<CardTitle>Pax Advantage</CardTitle>
								<CardSubtitle>Smart Advice + Simple Management</CardSubtitle>
								<Row className="pt-5 pt-md-3">
									<Col xs={12} sm={8} xl={6} className="align-self-top m-auto">
				  					<ListGroup>{simpleList.map(createItem)}</ListGroup>
	        				</Col>
	        				{/* 
  				        <Col xs={12} sm={6} xl={4} className="align-self-top mr-auto pt-3 pt-sm-0">
								  	<ListGroup>{simpleList.map(createItem)}</ListGroup>
					        </Col> */}
				        </Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
    );
	}
}

export default PaxAdvantage;
