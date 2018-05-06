import React from 'react'
import { Col, Row } from 'reactstrap'

import FontAwesome from './fontawesome'

const Footer = ({ siteTitle }) => (
  <div className="footer d-print-none">
    <Row className="align-items-center">
      <Col xs={12} md={6}>
        <div>&copy; 2018 Sebastián Soto.</div>
      </Col>
      <Col className="text-md-right" xs={12} md={6}>
        <div>
          Made with{' '}
          <span className="text-danger">
            <FontAwesome icon="heart" />
          </span>{' '}
          and{' '}
          <a href="https://www.gatsbyjs.org/" target="_blank">
            Gatsby
          </a>{' '}
          in Santiago, 🇨🇱.
        </div>
        <div>
          <a href="https://github.com/spsoto/soto.sh" target="_blank">
            <FontAwesome icon="code" className="mr-1" />See source code
          </a>.
        </div>
      </Col>
    </Row>
  </div>
)

export default Footer
