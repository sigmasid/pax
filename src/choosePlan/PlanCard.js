import React from 'react';
import { Row, Col, Card, CardTitle, ListGroup, ListGroupItem, CardSubtitle, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import NumberFormat from 'react-number-format';

//const util = require('util'); //print an object

export const PlanCard = (selectedPlan) => {

	var plan = selectedPlan['plan'];

  var createPositiveItem = function(item, index) {
    return(<ListGroupItem key={index} className="border-0 text-dark"><span className="pr-4" role="img" aria-label="plan negatives">&#128077;</span>{item}</ListGroupItem>);
  };

  var createNegativeItem = function(item, index) {
    return(<ListGroupItem key={index} className="border-0 text-dark"><span className="pr-4" role="img" aria-label="plan negatives">&#128078;</span>{item}</ListGroupItem>);
  };

	return(
	<Card className="plan-card p-2 col-12 col-md-6 col-lg-5 m-auto">
    <CardHeader>
    	<Row >
    		<Col xs={12} className="align-self-center">
					<CardTitle tag="h5" className="d-sm-inline font-weight-bold">{plan['name']}</CardTitle>
					<CardSubtitle xs={12} className="text-secondary plan-terms mt-2">{plan['state'].toProperCase()}</CardSubtitle>
				</Col>
				{/**
				<Col xs={3} className="rounded bg-light d-flex">
					<CardTitle tag="h5" className="d-flex mb-0 m-auto text-center text-dark font-weight-bold plan-terms">
						<div className="align-self-center">
							<div>Score</div>
							<div>{formatter.format(plan['score'])}</div>
						</div>
					</CardTitle>
				</Col> **/}
			</Row>
		</CardHeader>
		<CardBody>
			<Row className="pb-1 plan-terms">
				<Col xs={6} className="font-weight-bold">Expenses:</Col>
				<Col xs={6} className="text-right">
		      <NumberFormat value={plan['expenses']*100} displayType={'text'} suffix={'%'} decimalScale={2} />
		    </Col>
			</Row>
			<Row className="pb-1 plan-terms">
				<Col xs={6} className="font-weight-bold">Manager:</Col>
				<Col xs={6} className="text-right">{plan['investment manager'].toProperCase()}</Col>
			</Row>
			<hr />
			{/* 
			<CardSubtitle className="plan-terms">
				<ListGroup className="border-0">{plan['positives'].map(createPositiveItem)}</ListGroup>	
				<ListGroup className="border-0">{plan['negatives'].map(createNegativeItem)}</ListGroup>	
			</CardSubtitle>		
			*/}

			</CardBody>
			<CardFooter>
				<Button block className="Pax-accent"><a href={plan['url'] || '#'} target="_blank" className="plan-card-link">Learn More</a></Button>
			</CardFooter>
		</Card>
	)
};