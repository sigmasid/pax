import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Media, CardSubtitle, CardFooter, Button } from 'reactstrap';
import bankImage from '../images/bank_icon_2x.png'; // Tell Webpack this JS file uses this image
import { ProcessStepHeader } from './ProcessStepHeader.js';

class ConnectBank extends Component  {
  constructor (props) {
    super(props);

    this.state = { isComplete: false };
  }

  render() {
    return (
    <Card className="Dashboard-component mt-5">
      { ProcessStepHeader(this.props.step, bankImage, false) }
    	<CardBody>
    		<span className="round hollow text-center d-flex m-auto">
    			<h3 className="m-auto align-self-center">3</h3>
    		</span>
    		<CardSubtitle className="text-center pt-5 font-weight-bold">Connect Your Bank</CardSubtitle> 
    		<p className="text-center small pt-2 text-dark">We use this bank to fund your deposits. But we never store your bank details.</p>    		
    	</CardBody>
    </Card>
  );
  }
}

export default ConnectBank;