import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap';
import * as firebase from "firebase";

import TopNav from './TopNav.js'; 
import BottomNav from './BottomNav.js';
import JoinList from './home/JoinList.js';

import Signup from './Signup.js'; 
import Dashboard from './Dashboard.js'; 
import Login from './Login.js'; 
import Home from './Home.js'; 
//import Plan from './plan/CreatePlan.js'; 
import Plan from './choosePlan/PickPlan.js'; 

import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

var config = {
  apiKey: "AIzaSyCTNSGGbvOYd-PQVxAVql43RKCXAUwuTzk",
  authDomain: "pax-finance.firebaseapp.com",
  databaseURL: "https://pax-finance.firebaseio.com",
  projectId: "pax-finance",
  storageBucket: "",
  messagingSenderId: "906411202327"
};
firebase.initializeApp(config);

String.prototype.toProperCase = function(opt_lowerCaseTheRest) {
  return (opt_lowerCaseTheRest ? this.toLowerCase() : this)
    .replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s){ return s.toUpperCase(); });
};

class App extends Component {
  render() {
    return (
      <Container fluid>
        <TopNav message="" />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/plan" component={Plan} />
        </Switch>
        <JoinList />
        <BottomNav /> 
      </Container>
    );
  }
}

export default App;