import React, { Component } from 'react';
import { Card, CardBody, Row, Col, Button, Media, CardSubtitle,  CardFooter, FormGroup, Input, Label } from 'reactstrap';

import scholarImage from '../images/scholar_icon_2x.png'; // Tell Webpack this JS file uses this image
import editImage from '../images/edit_icon_2x.png'; // Tell Webpack this JS file uses this image
import doneImage from '../images/done_icon_2x.png'; // Tell Webpack this JS file uses this image

function DaysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

class Beneficiary extends Component {
    constructor (props) {
      super(props);

      this.state = 
      { selectedMonth: 1,
        selectedYear: 2017,
        beneficiarySSN: "",
        isEditing: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSelectMonth = this.handleSelectMonth.bind(this);
      this.handleSelectYear = this.handleSelectYear.bind(this);
      this.changeMode = this.changeMode.bind(this);
    }

    handleSelectMonth(event) {
    this.setState({selectedMonth: event.target.value});
    }

    handleSelectYear(event) {
    this.setState({selectedYear: event.target.value});
    }

    handleChange(event) {
      var stringNum = event.target.value.toString();

      if (stringNum.length === 9) {
        var x = stringNum.replace(/\D/g, '').match(/(\d{3})(\d{2})(\d{4})/);
        var formattedSSN = x[1] + '-' + x[2] + '-' + x[3];
        this.setState({beneficiarySSN: formattedSSN});
      } else {
        this.setState({beneficiarySSN: stringNum});
      }
    }

    changeMode(event) {
      this.setState({isEditing: !this.state.isEditing});
    }

    render() {
    return (
      <Card className="Dashboard-component mb-5 mt-5">
        <CardBody>
          <Row>
            <Col xs={12} sm={10} md={10}>
              <Media>
                <Media left>
                  <Media object src={scholarImage} alt="Beneficiary" />
                </Media>
                <Media body>
                  <Media heading>Beneficiary</Media>
                  <CardSubtitle>Only one beneficiary is allowed per account & you can update the information as many times as you need to.</CardSubtitle>
                </Media>
              </Media>
            </Col>
            <Col sm={2} className="text-right d-none d-sm-block">
              <Button className="Update-button btn-circle btn-lg" color={this.state.isEditing ? "success" : "warning"} onClick={this.changeMode} size="sm">
                <img src={this.state.isEditing ? doneImage : editImage } alt="..." />
                <span className="d-sm-none">{this.state.isEditing ? "done" : "update"}</span>
              </Button>
            </Col>
          </Row>
        </CardBody>
        <CardBody>
          <FormGroup className="form-row" row>
              <Label for="beneficiaryName" size="sm" sm={2}>Legal Name</Label>
              <Col sm={9}>
                <Input name="name" placeholder="beneficiary name" id="beneficiaryName" className="form-control" disabled={!this.state.isEditing} />
              </Col>
          </FormGroup>

          <FormGroup className="form-row" row>
            <Label for="beneficiaryBirthday" size="sm" sm={2}>Birthday</Label>
            <Col xs={4} sm={3}>
              <Input type="select" name="beneficiaryBirthMonth" placeholder="month" id="beneficiaryBirthMonth" className="form-control" onChange={this.handleSelectMonth} disabled={!this.state.isEditing}>
                {[...Array(12).keys()].map(month => <option key={month} value={month}>{month + 1}</option>)}
              </Input>
            </Col>
            <Col xs={4} sm={3}>
              <Input type="select" name="beneficiaryBirthDate" placeholder="date" id="beneficiaryBirthDate" className="form-control" disabled={!this.state.isEditing}>
                {[...Array(DaysInMonth(this.state.selectedMonth,this.state.selectedYear)).keys()].map(day => <option key={day} value={day + 1}>{day + 1}</option>)}
              </Input>
            </Col>
            <Col xs={4} sm={3}>
              <Input type="select" name="beneficiaryBirthYear" placeholder="year" id="beneficiaryBirthYear" className="form-control" onChange={this.handleSelectYear} disabled={!this.state.isEditing}>
                {[...Array(100).keys()].map(year => <option key={year} value={2017 - year}>{2017 - year}</option>)}
              </Input>
            </Col>
          </FormGroup>

          <FormGroup className="form-row" row>
            <Label for="beneficiarySSN" size="sm" sm={2}>Social Security Number</Label>
            <Col xs={12} sm={9}>
              <Input name="beneficiarySSN" placeholder="" id="beneficiarySSN1" className="form-control" onChange={this.handleChange} value={this.state.beneficiarySSN} disabled={!this.state.isEditing}/>
            </Col>
          </FormGroup>
        </CardBody>
        <CardFooter className="d-sm-none">
          <Button color="success" block onClick={this.changeMode}>{this.state.isEditing ? "done" : "edit"}</Button>
        </CardFooter>
      </Card>
    );
  }
}

export default Beneficiary;