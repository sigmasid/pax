import React, { Component } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import 'chartjs-plugin-datalabels';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Alert } from 'reactstrap';

//const util = require('util'); //print an object as util.inspect(obj)

function currencyFormatter(value, context) {
  return formatter.format(Math.round(value['y']));
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

function SavingsLabels(periods) {
	var labels = [];
	labels.push("Today");

	for (var i = 0; i < periods; i++) { 
    labels.push("");
	}
	labels.push("Age 18");
	return labels;
}

function SavingsCalculator(starting, monthly, rate, numYears) {
	var annualGrowth = [];

	var numMonths = numYears * 12;
	var monthlyRate = rate / 12;
	var totalAmount = starting;
	annualGrowth.push({x: 0, y: starting});

	for (var i = 1; i <= numMonths; i++) { 
		totalAmount = (totalAmount * (1 + monthlyRate)) + monthly;
		
		if (i % 12 === 0) {
    	annualGrowth.push({x: i, y: totalAmount});
  	}
	}

  return annualGrowth;
}

function SavingsData(labelName, dataSet, color, borderColor, dash) {
  return {
      label: labelName,
      fill: 'bottom',
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: borderColor,
      borderWidth: 2,
      borderDash: dash,
      borderCapStyle: 'butt',
      borderJoinStyle: 'miter',
      pointRadius: 0,
      data: dataSet,
      datalabels: {
        align: 'end',
        anchor: 'start',
        offset: 20
      }
  }
}

class SavingsBarChart extends Component {
  render() {
    const data = (canvas) => {

    return {
      labels: [["Taxable","Savings","Account"],["Taxable","Investment","Account"],["Pax"]],
      datasets: 
      [{
        backgroundColor:["rgba(255, 235, 59, 0.3)","rgba(255, 235, 59, 0.6)","rgba(255, 235, 59, 0.9)"],
        data: this.props.datasets,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
      }]
      }
    }

    return (
        <Bar data={data} width={375} height={400} options={{
          legend: {
            display: false,
          },
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              color: 'black',
              font: {
                family: 'Roboto',
                size: 20
              },
              formatter: currencyFormatter
            }
          },
          tooltips: {
            enabled: false
          },
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 0
            }
          },
          scales: {
            yAxes: [{
              gridLines: [{
                display: false
              }],
              ticks: {
                display: false,
                beginAtZero: true,
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
            }],
          }
        }} 
        />
    );
  }
}


class SavingsChart extends Component {
  render() {
    var lineData = [];
    lineData['labels'] = SavingsLabels(17);
    lineData['datasets'] = this.props.datasets;

    return (
        <Line data={lineData} options={{
          plugins: {
            datalabels: {
              display: function(context) {
                return context.dataIndex === 0 || context.dataIndex === (context.dataset.data.length - 1); // display labels with an odd index
              },
              backgroundColor: function(context) {
                return(context.dataset.backgroundColor)
              },
              borderRadius: 5,
              color: 'black',
              font: {
                family: 'Roboto',
                size: '20'
              },
              formatter: currencyFormatter
            }
          },
          legend: {
            display: true,
            position: "bottom",
            labels: { 
              fontFamily: 'Roboto',
              fontSize: 18
              }
          },
          layout: {
            padding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 0
            }
        	},
          scales: {
            yAxes: [{
              id: 'total savings',
              gridLines: [{
          			display: false
          		}],
              ticks: {
              	display: false,
                beginAtZero: true,
                callback: function(value, index, values) {
                  return formatter.format(value);
                },
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
            }],
        	}
        }} 
        />
    );
  }
}

class SavingsComparison extends Component {
  constructor (props) {
    super(props);

    this.state = { startingAmount: 1000, monthlyInvestment: 30, interestRate: 0.07, numYears: 18, taxRate: .28, savingsAccountRate: 0.01 };
    this.changeMonthlyInvestment = this.changeMonthlyInvestment.bind(this);
    this.changeStartingInvestment = this.changeStartingInvestment.bind(this);
  }

  changeStartingInvestment(amount) {
    this.setState({ startingAmount: amount.target.value });
  }

  changeMonthlyInvestment(amount) {
    this.setState({ monthlyInvestment: amount.target.value });
  }

  investmentLineData() {
    var data1 = SavingsCalculator(this.state.startingAmount, this.state.monthlyInvestment, this.state.interestRate, this.state.numYears);
    var data2 = SavingsCalculator(this.state.startingAmount, this.state.monthlyInvestment, this.state.interestRate * ( 1 - this.state.taxRate), this.state.numYears);
    var data3 = SavingsCalculator(this.state.startingAmount, this.state.monthlyInvestment, this.state.savingsAccountRate * ( 1 - this.state.taxRate), this.state.numYears);

    var dataset1 = SavingsData("Pax", data1, 'rgba(255, 235, 59, 0.3)','rgba(255, 235, 59, 0.3)',[]);
    var dataset2 = SavingsData("Taxable Investment Account", data2, 'rgba(255, 235, 59, 0.6)', 'rgba(255, 235, 59, 0.6)',[15]);
    var dataset3 = SavingsData("Taxable Savings Account", data3, 'rgba(255, 235, 59, 0.9)','rgba(255, 235, 59, 0.9)',[10]);

    /**
    var dataset1 = SavingsData("Pax", data1, 'rgba(67,217,253,0.7)','rgba(67,217,253,1.0)',[]);
    var dataset2 = SavingsData("Taxable Investment Account", data2, 'rgba(156,232,250,0.7)', 'rgba(156,232,250,1.0)',[15]);
    var dataset3 = SavingsData("Taxable Savings Account", data3, 'rgba(213,247,255,0.7)','rgba(213,247,255,1.0)',[10]);
    **/

    return [dataset3, dataset2, dataset1];    
  }

  investmentBarData() {
    var data1 = SavingsCalculator(this.state.startingAmount, this.state.monthlyInvestment, this.state.interestRate, this.state.numYears);
    var data2 = SavingsCalculator(this.state.startingAmount, this.state.monthlyInvestment, this.state.interestRate * ( 1 - this.state.taxRate), this.state.numYears);
    var data3 = SavingsCalculator(this.state.startingAmount, this.state.monthlyInvestment, this.state.savingsAccountRate * ( 1 - this.state.taxRate), this.state.numYears);

    return [data3.pop(), data2.pop(), data1.pop()];    
  }

	render() {
		const StartingAmount = [0,100,250,500,1000,2500,5000,10000,25000];
		const SliderIntervals = [0,12.5,25,37.5,50,62.5,75,87.5,100];
		const MonthlyInvestment = [0,5,10,30,50,100,250,500,1000];

		return(
			<div className="Home-section">
        <Row>
          <Col xs={12} lg={5} className="mr-auto">
            <Card className="Head-start">
            <CardBody>
              <CardTitle>Get a Head Start</CardTitle>
              <CardSubtitle className="pb-5 pb-sm-0">Money grows on compounding trees. <br/>Check out the difference starting early makes!</CardSubtitle>
              <p className="lead pt-sm-4 pt-0">Starting Investment: <span>{formatter.format(Math.round(this.state.startingAmount))}</span></p>
              <div className="pb-4 pb-sm-4">
                <ReactBootstrapSlider value={this.state.startingAmount} ticks={StartingAmount} ticks_snap_bounds = {10000} ticks_positions={SliderIntervals} change={this.changeStartingInvestment} />
              </div>

              <p className="lead">Monthly Deposit: <span>{formatter.format(Math.round(this.state.monthlyInvestment))}</span></p>
              <div className="pb-5">
                <ReactBootstrapSlider value={this.state.monthlyInvestment} ticks={MonthlyInvestment}  ticks_snap_bounds = {10000} ticks_positions={SliderIntervals} change={this.changeMonthlyInvestment} />
              </div>
            </CardBody>
            </Card>
          </Col>
          <Col xs={12} lg={7} className="mx-auto align-self-end d-block d-xl-none">
            <SavingsBarChart datasets={this.investmentBarData()} />
          </Col>
        </Row>
				<Row className="h-100 w-90 mx-auto align-self-end d-none d-xl-block">
          	<SavingsChart datasets={this.investmentLineData()} />
      	</Row>
        <Row>
          <Col xs={12} lg={7} xl={10} className="ml-auto mx-xl-auto align-self-end text-center">
            <Alert className="Pax-alert mt-5 mt-xl-5 mt-lg-2" ><strong>Pax</strong> helps you setup college savings accounts that offer tax-free investment growth and tax-free withdrawals for qualified educational expenses.</Alert>
          </Col>
        </Row>
      </div>
    );
	}
}

export default SavingsComparison;