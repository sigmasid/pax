/* esli nt-disable react-in-jsx-scope */
import React, { Component } from 'react'
import { Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom'

class TopNav extends Component {

  render() {
    return(
      <Navbar className="fixed-top top-nav">
        <NavbarBrand href="/">Pax</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to={`/login`}>login</Link>
          </NavItem>

          <NavItem className="signup-nav-item bg-warning">
            <Link to={`/signup`}>signup</Link>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default TopNav;