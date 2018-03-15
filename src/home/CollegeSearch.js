import React, { Component } from 'react';
import { InputGroup, InputGroupButton, Input, Button, ListGroupItem, ListGroup } from 'reactstrap';
import collegeData from '../colleges.json';
import searchIcon from '../images/search_2x.png'; // Tell Webpack this JS file uses this image

//const util = require('util'); //print an object

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : collegeData.filter(college =>
    college['Name'].toLowerCase().slice(0, inputLength) === inputValue
  );
};

export const GetFirstCollege = collegeData[0];

export class CollegeSearch extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: '',
      results: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event, result) {
    var results = getSuggestions(event.target.value);
    this.setState({ results: results })
  };

  handleSelect(event, college) {
    event.preventDefault();
    this.props.selectCollege(college);
    this.setState({value: college['Name'], results: []});
  };

  render() {
    var createItem = function(result, index) {
      return(<ListGroupItem key={result['Name']} tag="a" onClick={event => this.handleSelect(event, result)} className="zindex-tooltip bg-white">{result['Name']}</ListGroupItem>);
    }.bind(this);

  	return(
      <InputGroup className="college-search">
    		<Input className="college-search-bar" placeholder={GetFirstCollege['Name']} onChange={event => this.handleChange(event)} />
    		<InputGroupButton>
    			<Button  className="bg-none border-0 rounded">
            <img src={searchIcon} alt="Search Colleges"/>
          </Button>
    		</InputGroupButton>
        <ListGroup className="college-search-results absolute-wrapper w-100 mt-5 mb-2">{this.state.results.length !== 0 ? this.state.results.map(createItem) : null }</ListGroup>
  		</InputGroup>
  	)
  }
}