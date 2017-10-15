import React, { Component } from 'react'
import { Row, Card, CardBody, CardTitle, CardSubtitle, Col, Alert } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import CollegeCard from './CollegeCard.js';
import { CollegeSearch, GetFirstCollege } from './CollegeSearch.js';

import 'chartjs-plugin-datalabels';
//const util = require('util'); //print an object

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

function CurrencyFormatter(value, context) {
    return formatter.format(Math.round(value));
}

class CollegeCostChart extends Component {
  render() {
		const data = (canvas) => {

		return {
			labels: ["Today","In 18 Years"],
		  datasets: 
      [{
      	label: 'Annual Cost of College',
        backgroundColor:["rgba(255,247,223,1.0)",'rgba(255,193,7,1.0)'],
	      data: this.props.costData,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
	    }]
		  }
		}
    var collegeName = this.props.collegeName;

    return (
        <Bar data={data} height={400} width={400} options={{
          legend: {
            display: false,
          },
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              color: 'black',
              display: function(context) {
                return context.dataset.data[context.dataIndex] > 15;
              },
              font: {
                family: 'Roboto',
                size: 20
              },
              formatter: CurrencyFormatter
            }
          },
          tooltips: {
            enabled: false
          },
          title: {
            display: true,
            position: 'bottom',
            text: this.props.collegeName,
            fontFamily: 'Roboto',
            fontSize: 20,
            padding: 20,
          },
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 50,
                bottom: 0
            }
        	},
          scales: {
            yAxes: [{
              id: 'annual cost of college',
              gridLines: [{
          			display: false
          		}],
              ticks: {
              	display: false,
                beginAtZero: true,
                callback: function(value, index, values) {
                  return formatter.format(value);
                },
                fontFamily: 'Roboto',
                fontSize: 18,
              }
            }],
            xAxes: [{
              id: 'beneficiary age',
              type: 'category',
              gridLines: [{
            		display: false
            	}],
              ticks: {
              	padding: 10,
                fontFamily: 'Roboto',
                fontSize: 18
							}
            }]
        	}
        }} 
        />
    );
  }
}

function futureCostCalculator(current, years) {
  var growthRate = .03;
  return current * Math.pow((1 + growthRate), years); 
} 

const fourYearCost = (collegeName, cost) => {
  return(
  <Alert color="warning" className="text-center">
    In 18 years, <strong>{ collegeName }</strong> is expected to cost <strong>{ formatter.format(Math.round(cost * 4)) }</strong> for 4 years including tuition and room & board.
  </Alert>);
}

class CollegePicker extends Component {
  constructor (props) {
    super(props);

    this.state = { college: GetFirstCollege, yearsToCollege: 18 };
    this.selectCollege = this.selectCollege.bind(this);
  }

  selectCollege(college) {
  	this.setState({college: college });
  }

  currentCost(costString) {
    var number = costString.replace(/[$,]+/g,"");
    return (number !== undefined) ? parseFloat(number) : 0;
  }

	render() {
    var currentCost = this.currentCost(this.state.college['Tuition and fees']);
    var collegeName = "Annual Cost of " + this.state.college['Name'];
		return(
			<Row className="Home-section">
				<Col xs={12} lg={5} className="ml-auto align-self-center">
          <Card>
            <CardBody>
              <CardTitle className="display-4 text-center text-sm-left">How Much Will College Cost?</CardTitle>
              <CardSubtitle className="text-center text-sm-left pb-5">College prices are increasing at 2x rate of inflation! See how much their 'Dream College' will likely cost.</CardSubtitle>
    		      <CollegeSearch selectCollege={this.selectCollege} />
              <div className="pt-5"><CollegeCard college={this.state.college} /></div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} lg={6} className="ml-auto align-self-end">
        	<div className="pb-5"><CollegeCostChart costData={[currentCost, futureCostCalculator(currentCost, this.state.yearsToCollege)]} collegeName={collegeName} /></div>
          <div>{fourYearCost(this.state.college['Name'], futureCostCalculator(currentCost, this.state.yearsToCollege))}</div>
        </Col>
      </Row>
    );
	}
}

export default CollegePicker;