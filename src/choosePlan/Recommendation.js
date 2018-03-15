import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import statePlans from '../stateplans.json';
import planList from '../planlist.json';
import singleTaxRates from '../statemarriedrates.json';
import {PlanCard} from "./PlanCard.js";
import NumberFormat from 'react-number-format';
//const util = require('util'); //print an object

const GetPlans = (selectedState) => {
  return planList.filter(plan =>
    plan['state'] === selectedState
  );
};

const GetRecommendation = (selectedState, selectedStateName) => {
  var recommendation = {};

  if (selectedState['no state tax']===true) {
    recommendation['expression'] = '\u{1F60E}';
    recommendation['taxSavings'] = false;
    recommendation['title'] = "Pick any state plan!";
    recommendation['description'] = "Lucky you! " + selectedStateName + " does not have personal income taxes! That means you can choose the best 529 plan (not just from " + selectedStateName + ".";
  } else if (selectedState['state tax benefits']===false) {
    recommendation['expression'] = '\u{1F611}';
    recommendation['taxSavings'] = false;
    recommendation['title'] = "Pick any state plan";
    recommendation['description'] = "Good news – choose any 529 plans nationwide. \n Not so good news – " + selectedStateName + " offers no state tax benefits for choosing an in-state plan.";
  } else if (selectedState['tax benefit any state']===true) {
    recommendation['expression'] = '\u{1F632}';
    recommendation['taxSavings'] = true;
    recommendation['title'] = "Choose any plan + get tax savings!";
    recommendation['description'] = "Thank your representatives! " + selectedStateName + " offers great tax advantages AND you get to pick from the best 529 plans nationwide!";
  } else {
    recommendation['expression'] = '\u{1F911}';
    recommendation['taxSavings'] = true;    
    recommendation['title'] = "Go with " + selectedStateName + "'s 529 Plan";
    recommendation['description'] = "Great News! " + selectedStateName + " offers extra tax advantages for choosing in-state plan.";
  }

  return(recommendation);
};

const GetMarginalStateTax = (selectedState, filingStatus, income) => {
  var selectedBracket = 0;
  var taxBrackets = filingStatus === 0 ? selectedState['married tax brackets'] : selectedState['single tax brackets'];

  Object.keys(taxBrackets).map((item, index) => {
    if (income > Number(item)) {
      selectedBracket = item;
    }
    return null;
  });

  return taxBrackets[selectedBracket];
}

const GetTaxSavings = (inputs, selectedState) => {
  var savings = {};
  var maxIncomeDeduction = inputs['filingStatus'] === 'married' ? selectedState['married tax benefit'] : selectedState['single tax benefit'];
  var stateTaxRate = GetMarginalStateTax(selectedState, inputs['filingStatus'], inputs['income']); 

  if (selectedState['tax benefit type'] === 'Deduction') {
    savings['expectedTaxSaving'] = inputs['contribution'] > maxIncomeDeduction ? maxIncomeDeduction * stateTaxRate : inputs['contribution'] * stateTaxRate;
    savings['maxTaxSaving'] = maxIncomeDeduction * stateTaxRate; 
  } else if (selectedState['tax benefit type'] === 'Credit') {
    savings['expectedTaxSaving'] = inputs['contribution'] * selectedState['tax credit'];
    savings['maxTaxSaving'] = maxIncomeDeduction * selectedState['tax credit']; 
  }

  return savings;
}

class Recommendations extends Component {
	render() {
		var selectedState = statePlans[this.props.inputs['selectedState'].toLowerCase()];
		var recommendation = GetRecommendation(selectedState, this.props.inputs['selectedState']);
		var taxSavings = recommendation['taxSavings'] === true ? GetTaxSavings(this.props.inputs, selectedState) : "";
    
    var createPlanCard = function(plan, index) {
      return(<PlanCard key={index} plan={plan} />);
    };

    return (
      <div>
			<Row className="Pax-primary-light p-3 rounded">
        <Col xs={4} md={2} className="m-auto mb-2 mb-md-0">
          <span className="pr-md-3 emoji-max-font text-center" role="img" aria-label="rec-emoji">{ recommendation['expression'] }</span>
        </Col>
        <Col xs={12} md={7} className="m-auto pb-3 pb-md-0 text-center text-md-left">
          <h4 className="font-weight-bold">{ recommendation['title'] }</h4>
					<p className="m-md-0">{ recommendation['description'] }</p>
				</Col>
        <Col xs={12} md={3} className="m-auto">
          <h4 className="text-center font-weight-bold">Tax Savings:</h4>
          <h4 className="bg-white p-2 rounded strong font-weight-bold text-center text-dark">
            <NumberFormat value={taxSavings['expectedTaxSaving'] || 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </h4>
        </Col>
			</Row>
      <Row className="mt-5">
        { GetPlans(this.props.inputs['selectedState'].toLowerCase()).map(createPlanCard) }
      </Row>
      <Row>
        <Button color="link" onClick={this.props.startOver} block>start over</Button>
      </Row>
      </div>
	);
  }
 }

export default Recommendations;