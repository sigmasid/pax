import React, { Component } from 'react';
import 'chartjs-plugin-datalabels';
import { Doughnut} from 'react-chartjs-2';
import { Row, Col, Card, CardBody, ButtonGroup, Button, Alert } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';

export const AgeSlider = (selectedAge, ageOptions, ageLabel, changeAge) => {
  return(
    <Row className="d-flex align-items-center">
      <Col xs={3} sm={4} className="text-center">
        <span className="bg-light strong">Age: {ageLabel}</span>
      </Col>
      <Col xs={8} lg={6}>
        <ReactBootstrapSlider value={selectedAge} ticks={ageOptions} change={changeAge} />
      </Col>
    </Row>
  )};

export const ChangeMixButtons = (selected, handleSelect, strategyLabels, strategyDescriptions) => {
  return(
  <CardBody>
    <Col xs={12}>
      <ButtonGroup className="Investment-buttons" >
        <Button color={selected === 0 ? "warning" : "light"} onClick={() => handleSelect(0)}>{strategyLabels[0]}</Button>
        <Button color={selected === 1 ? "warning" : "light"} onClick={() => handleSelect(1)}>{strategyLabels[1]}</Button>
        <Button color={selected === 2 ? "warning" : "light"} onClick={() => handleSelect(2)}>{strategyLabels[2]}</Button>
      </ButtonGroup>
    </Col>
    <Col xs={12}>
      <Alert color="light">
          { strategyDescriptions[selected] }
      </Alert>
    </Col>
  </CardBody>
)};

export class InvestmentsStrategyChart extends Component {
  render() {
      const data = (canvas) => {
        return {
          labels: [
            'Stocks',
            'Bonds',
            'Short Term Reserves'
          ],
          datasets: [{
            data: this.props.investmentSet,
            backgroundColor: [
              'rgba(255,193,7,1.0)',
              'rgba(255,234,181,1.0)',
              'rgba(225,160,0,1.0 )',
            ],
            hoverBackgroundColor: [
              'rgba(255,193,7,0.7)',
              'rgba(255,234,181,0.7)',
              'rgba(225,160,0,0.7)',
            ]
          }],
          datalabels: {
            display: false
          }
        }
    }
    return (
      <div className="justify-content-center">
        <Doughnut data={data} width={300} height={300} options={{ 
          tooltip: {
            enabled: false
          },
          plugins: {
            datalabels: {
              display: false
            }
          },
          maintainAspectRatio: false,

          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontFamily: 'Roboto',
              fontSize: 18
            }
          }}} 
        />
      </div>
    );
  }
}

export const InvestmentMix = ({
  ageLabels: ['0-2','3-4','5-6','7-8','9-10','11-12','13-14','15','16','17','18','19+'],
  conservative: [[60,40,0],[50,50,0],[40,60,0],[30,70,0],[20,80,0],[10,90,0],[0,75,25],[0,50,50],[0,50,50],[0,25,75],[0,25,75],[0,0,100]],
  moderate: [[90,10,0],[80,20,0],[70,30,0],[60,40,0],[50,50,0],[40,60,0],[30,70,0],[20,80,0],[10,90,0],[0,75,25],[0,75,25],[0,75,25]],
  aggressive: [[100,0,0],[100,0,0],[90,10,0],[80,20,0],[70,30,0],[60,40,0],[50,50,0],[40,60,0],[30,70,0],[20,80,0],[10,90,0],[10,90,0]]
});