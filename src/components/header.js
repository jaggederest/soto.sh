import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

import FontAwesome from './fontawesome'

const enhance = C =>
  class extends Component {
    state = {
      isOpen: false,
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen })

    render() {
      return (
        <C {...this.props} toggle={this.toggle} isOpen={this.state.isOpen} />
      )
    }
  }

const Header = ({ isOpen, siteTitle, toggle }) => (
  <Navbar color="faded" light expand="md" className="mb-4">
    <div className="container">
      <NavbarBrand tag={Link} to="/">
        {siteTitle}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/posts">
              Posts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/puc">
              PUC{' '}
              <span role="img" aria-label="Spanish">
                🇪🇸
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/contact">
              <FontAwesome icon="envelope" />
              <span className="ml-2 d-md-none">Contact</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </div>
  </Navbar>
)

export default enhance(Header)
