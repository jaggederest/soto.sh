import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap'

import MainLayout from '../layouts/main'
import MathTab from '../components/puc/math'

const enhance = C =>
  class extends Component {
    state = {
      currentTab: 0,
    }

    setCurrentTab = currentTab => this.setState({ currentTab })

    render() {
      return (
        <C
          {...this.props}
          currentTab={this.state.currentTab}
          setCurrentTab={this.setCurrentTab}
        />
      )
    }
  }

const TabButton = ({ children, index, currentTab, setCurrentTab }) => (
  <NavLink
    active={currentTab === index}
    onClick={() => setCurrentTab(index)}
    style={{ cursor: 'pointer' }}
  >
    {children}
  </NavLink>
)

const PUC = ({ currentTab, setCurrentTab }) => (
  <MainLayout>
    <div>
      <h2 className="mb-4">Material PUC</h2>
      <div className="mb-4">
        <p>
          Debido a múltiples solicitudes por correo, en esta sección dejaré
          disponible todo el material que generé durante mis años de estudio en
          la <strong>Pontificia Universidad Católica de Chile</strong>,
          principalmente material de estudio para ramos matemáticos de entrada.
        </p>
        <p>
          Cualquier comentario, observación o sugerencia es bienvenido. También
          puedes avisarme si es que falta algún material en esta página. Puedes{' '}
          <Link to="/contact">contactarme</Link> para estos propósitos.
        </p>
      </div>

      <Nav tabs>
        <NavItem>
          <TabButton
            index={0}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          >
            Matemáticas
          </TabButton>
        </NavItem>
      </Nav>
      <Card className="border-top-0">
        <CardBody>{currentTab === 0 && <MathTab />}</CardBody>
      </Card>
    </div>
  </MainLayout>
)

export default enhance(PUC)
