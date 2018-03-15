import React, { Component } from 'react';
import 'chartjs-plugin-datalabels';
import { Doughnut} from 'react-chartjs-2';
import { Col, CardBody, ButtonGroup, Button, Alert } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';

export const AgeSlider = (selectedAge, ageOptions, ageLabels, changeAge) => {
  return(
    <div className="d-flex align-items-center">
      <Col xs={3} sm={4} className="text-center p-1 rounded bg-warning">
        <span className="strong">Age: {ageLabels[selectedAge]}</span>
      </Col>
      <Col xs={9} lg={8}>
        <ReactBootstrapSlider value={selectedAge} ticks={ageOptions} change={changeAge} />
      </Col>
    </div>
  )};

export const ChangeMixButtons = (selected, handleSelect, name) => {
  return(
  <CardBody>
    <Col xs={12}>
      <ButtonGroup className="w-100" >
        <Button className="btn-block mt-0" color={selected === 0 ? "warning" : "light"} onClick={() => handleSelect(0)}>{StrategyLabels[0]}</Button>
        <Button className="btn-block mt-0" color={selected === 1 ? "warning" : "light"} onClick={() => handleSelect(1)}>{StrategyLabels[1]}</Button>
        <Button className="btn-block mt-0" color={selected === 2 ? "warning" : "light"} onClick={() => handleSelect(2)}>{StrategyLabels[2]}</Button>
      </ButtonGroup>
    </Col>
    <Col xs={12}>
      <Alert color="light">
          { StrategyDescriptions(selected, name) }
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

const StrategyLabels = ["Conservative", "Moderate", "Aggressive"];

export const InvestmentMix = ({
  ageLabels: ['0-2','3-4','5-6','7-8','9-10','11-12','13-14','15','16','17','18','19+'],
  conservative: [[60,40,0],[50,50,0],[40,60,0],[30,70,0],[20,80,0],[10,90,0],[0,75,25],[0,50,50],[0,50,50],[0,25,75],[0,25,75],[0,0,100]],
  moderate: [[90,10,0],[80,20,0],[70,30,0],[60,40,0],[50,50,0],[40,60,0],[30,70,0],[20,80,0],[10,90,0],[0,75,25],[0,75,25],[0,75,25]],
  aggressive: [[100,0,0],[100,0,0],[90,10,0],[80,20,0],[70,30,0],[60,40,0],[50,50,0],[40,60,0],[30,70,0],[20,80,0],[10,90,0],[10,90,0]]
});

export const StrategyDescriptions = (index, name) => {
  switch (index) {
    case 0:
      return "Our conservative strategy focuses more on capital preservation (reduces chance & magnitude of potential losses) by investing a greater portion of the assets in bond ETFs early on and shifting to safer short term reserves earlier (similar to cash) as " + name + " gets closer to college age. You get a lower volatility and risk profile at the cost of some upside compared to our moderate & aggressive portfolios";
    case 1:
      return  "Our moderate strategy uses a blend of stocks and bonds ETFs in the early years that gradually shifts to a heavier bond focus as " + name + " gets older. This portfolio offers more of the upside from stocks in the earlier years than our conservative strategy and benefits from lower volatility (lower chances of losses) in the later years.";
    case 2:
      return "Our aggressive strategy provides the heaviest exposure to stocks (greater upside but greater volatility) in the early years and provides a more gradual shift to bond ETFs as " + name + " nears college. While you capture more of the upside from stocks, the portfolio is also exposed to greater volatility and risk of losses should the market underperform as " + name + " nears college age.";
    default:
      return "Please check out one of the other strategies";
  }
};