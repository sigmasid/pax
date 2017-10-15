import React, { Component } from 'react';
import { Button, Card, Media, CardSubtitle, CardBody, CardFooter, FormGroup, Row, Col, Input, Label } from 'reactstrap';

import accountImage from '../images/account_icon_2x.png'; // Tell Webpack this JS file uses this image
import editImage from '../images/edit_icon_2x.png'; // Tell Webpack this JS file uses this image
import doneImage from '../images/done_icon_2x.png'; // Tell Webpack this JS file uses this image

function States() {
  return(["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AS","DC","FM","GU","MH","MP","PW","PR","VI"])
}

function DaysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

class Account extends Component {
  constructor (props) {
    super(props);

      this.state = 
      { selectedMonth: 1,
        selectedYear: 2017,
        accountSSN: "",
        isEditing: false
      };
      this.changeMode = this.changeMode.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  changeMode(event) {
    this.setState({isEditing: !this.state.isEditing});
  }

  render() {
    return (
      <Card className="Dashboard-component mb-5 mt-5">
        <CardBody>
        <Row>
          <Col xs={12} sm={10}>
          <Media>
            <Media left>
              <Media object src={accountImage} alt="Account Holder Details" />
            </Media>
            <Media body>
              <Media heading>Personal Details</Media>
              <CardSubtitle>Contact details and personal information for the primary account holder</CardSubtitle>
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
          <Label for="accountFirstName" size="sm" sm={2}>Full Name</Label>
          <Col sm={9}>
            <Input name="name" placeholder="first name" id="accountFirstName" className="form-control" disabled={!this.state.isEditing} />
          </Col>
        </FormGroup>

        <FormGroup className="form-row" row>
          <Label for="streetAddress" size="sm" sm={2}>Street Address</Label>
          <Col sm={9}>
            <Input name="streetAddress" placeholder="full address" id="streetAddress" className="form-control" disabled={!this.state.isEditing} />
          </Col>
        </FormGroup>

        <FormGroup className="form-row" row>
          <Label for="accountCity" size="sm" sm={2}><span className="d-none d-sm-block">City, State, Zip</span><span className="d-sm-none">City</span></Label>
          <Col sm={3} xs={12}>
            <Input name="accountCity" placeholder="city" id="accountCity" className="form-control"  disabled={!this.state.isEditing} />
          </Col>
          <Col sm={2} xs={4}>
            <Label for="accountCity" size="sm" className="d-sm-none">State</Label>
            <Input type="select" placeholder="state" name="accountState" id="accountState" className="form-control" disabled={!this.state.isEditing}>
              {States().map(state => <option key={state}>{state}</option>)}
            </Input>
          </Col>
          <Col sm={4} xs={8}>
            <Label for="accountCity" size="sm" className="d-sm-none">Zip</Label>
            <Input type="number" placeholder="zip code" name="accountZip" id="accountZip" className="form-control" disabled={!this.state.isEditing} />
          </Col>
        </FormGroup>

        <FormGroup className="form-row" row>
          <Label for="accountHolderBirthday" size="sm" sm={2}>Birthday</Label>
          <Col xs={4} sm={3}>
            <Input type="select" name="accountHolderBirthMonth" placeholder="month" id="accountHolderBirthMonth" className="form-control" onChange={this.handleSelectMonth} disabled={!this.state.isEditing}>
              {[...Array(12).keys()].map(month => <option key={month} value={month}>{month + 1}</option>)}
            </Input>
          </Col>
          <Col xs={4} sm={3}>
            <Input type="select" name="accountHolderBirthDate" placeholder="date" id="accountHolderBirthDate" className="form-control" disabled={!this.state.isEditing}>
              {[...Array(DaysInMonth(this.state.selectedMonth,this.state.selectedYear)).keys()].map(day => <option key={day} value={day + 1}>{day + 1}</option>)}
            </Input>
          </Col>
          <Col xs={4} sm={3}>
            <Input type="select" name="accountHolderBirthYear" placeholder="year" id="accountHolderBirthYear" className="form-control" onChange={this.handleSelectYear} disabled={!this.state.isEditing}>
              {[...Array(100).keys()].map(year => <option key={year} value={2017 - year}>{2017 - year}</option>)}
            </Input>
          </Col>
        </FormGroup>
      </CardBody>
      <CardFooter className="d-sm-none">
        <Button block color="success" onClick={this.changeMode}>{this.state.isEditing ? "done" : "edit"}</Button>
      </CardFooter>
    </Card>
  );
  }
}

export default Account;