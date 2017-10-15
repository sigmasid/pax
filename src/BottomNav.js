/* eslint-disable react-in-jsx-scope */
import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';

export default class BottomNav extends Component {
  render() {
    return(
    <Container>
      <Navbar className="header" light>
        <Nav className="ml-auto">
          <NavItem>
            <Link to="/signup">About</Link>
          </NavItem>

          <NavItem>
            <Link to={`/privacy`}>Privacy</Link>
          </NavItem>
          
          <NavItem>
            <Link to={`/terms`}>Terms</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </Container>
    )
  }
}