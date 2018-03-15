import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input } from 'reactstrap';
import babyIcon from '../images/baby-icon.png'; // Tell Webpack this JS file uses this image

class IntroSection extends Component {
  render() {
  	return(
		<Row className="Home-section Intro-section align-items-center pb-5 pt-5 pb-sm-0 pt-sm-0 mb-0 bg-light">
			<Col xs={12} md={10} >
				<Card>
				<CardBody>
						<Row>
							<Col xs={8} md={6} lg={4} className="align-self-center">
								<CardTitle>Meet the Class of</CardTitle>
			  				<CardSubtitle>Pax will help you get them get there with simple plans customized just for you</CardSubtitle>
							</Col>
							<Col xs={4} md={2} lg={3} className="align-self-center m-auto">
								<Input type="number" placeholder="2036" size="lg" className="d-sm-inline text-center" />
							</Col>
				  		<Col xs={12} md={2} lg={5} className="Intro-image m-md-auto text-center align-self-start align-self-md-center mt-0 mb-0">
            		<img src={babyIcon} alt="Close Join"/>
  						</Col>
						</Row>
					{/*
	  				<Link to={'/signup'}><Button className="mt-5 d-block d-sm-none text-black" size="lg" color="warning" block>join</Button></Link>
	  				<Link to={'/signup'}><Button className="mt-5 d-sm-block d-none text-black" size="lg" color="warning">join</Button></Link> */}
 				</CardBody>
 				</Card>
  		</Col>

    </Row>	
  	)
  }
}

export default IntroSection;