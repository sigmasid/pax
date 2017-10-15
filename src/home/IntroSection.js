import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button } from 'reactstrap';
	
class IntroSection extends Component {
  render() {
  	return(
		<Row className="Home-section Intro-section align-items-center pb-5 pt-5 pb-sm-0 pt-sm-0">
			<Col xs={12} md={10} xl={6} className="ml-xl-auto">
				<Card>
				<CardBody>
					<CardTitle className="display-4 d-sm-inline">
						<Row>
							<Col xs={12} sm={10} md={8} className="align-self-center pb-3 pb-md-0 text-center text-sm-left">Meet the Class of</Col>
							<Col xs={12} sm={8} md={4}  className="align-self-center pb-3 pb-sm-0">
								<Input type="number" placeholder="2036" size="lg" className="display-4 d-sm-inline text-center" />
							</Col>
							<Col xs={12} sm={8}>
			  				<CardSubtitle className="text-muted mb-2 mt-2 text-center text-sm-left">Pax will help you get them get there with our simple, automated & low-cost college savings solutions</CardSubtitle>
		  				</Col>
						</Row>
	  				<Button className="mt-5 d-block d-sm-none text-black" size="lg" color="light" block>Join list</Button>
	  				<Button className="mt-5 d-sm-block d-none text-black" size="lg" color="light">Join list</Button>
					</CardTitle>					
 				</CardBody>
 				</Card>
  		</Col>
  		<Col xs={0} md={2} xl={5}></Col>
    </Row>
  	)
  }
}

export default IntroSection;