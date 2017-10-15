import React, { Component } from 'react'
import { Row, Col, Card, CardHeader, CardFooter, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';

class CollegeCard extends Component {

  render() {
  	var instateTuition = (this.props.college !== undefined && this.props.college['In-state'] !== '') ? 
  			<Row>
					<Col xs={6}>In-State Tuition:</Col>
					<Col xs={6}>{this.props.college['In-state']}</Col>
				</Row> 
				: null

  	return(
		<Card className="college-card">
      <CardHeader>
      	<Row >
      		<Col xs={9} className="align-self-center">
						<CardTitle className="d-sm-inline">{this.props.college['Name']}</CardTitle>
					</Col>
					<Col xs={3} className="align-items-center text-right">
						<CardTitle className="d-sm-inline">#{this.props.college['Rank']}</CardTitle>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="text-secondary">{this.props.college['Location']}</Col>
				</Row>
			</CardHeader>
			<CardBody>
				<CardSubtitle className="pt-2 pb-4">{this.props.college['Description']}</CardSubtitle>		
				<Row>
					<Col xs={6}>Tuition:</Col>
					<Col xs={6}>{this.props.college['Tuition and fees']}</Col>
				</Row>
				{ instateTuition }	
				</CardBody>
			</Card>
  	)
  }
}

CollegeCard.propTypes = {
  college: PropTypes.object.isRequired
} 

export default CollegeCard;