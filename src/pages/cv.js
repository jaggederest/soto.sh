import React from 'react'
import { Col, Media, Row } from 'reactstrap'

import MainLayout from '../layouts/main'
import FontAwesome from '../components/fontawesome'

import ruby from '../attachments/logos/ruby.png'
import node from '../attachments/logos/node.png'
import python from '../attachments/logos/python.png'
import graphql from '../attachments/logos/graphql.png'
import postgres from '../attachments/logos/postgres.png'
import react from '../attachments/logos/react.svg'
import vue from '../attachments/logos/vue.png'
import angular from '../attachments/logos/angular.png'
import webpack from '../attachments/logos/webpack.png'
import aws from '../attachments/logos/aws.png'
import docker from '../attachments/logos/docker.png'
import jenkins from '../attachments/logos/jenkins.png'

import instacart from '../attachments/logos/instacart.png'
import ubiome from '../attachments/logos/ubiome.jpg'
import coddde from '../attachments/logos/coddde.png'
import puc from '../attachments/logos/uc.png'

const Technology = ({ name, image, icon }) => (
  <Media className="align-items-center mb-2">
    <Media
      left
      className="mr-2 d-flex align-items-center"
      style={{ width: '2.5rem', minHeight: '3rem' }}
    >
      {image && <img src={image} alt={name} className="img-responsive w-100" />}
      {icon && <FontAwesome icon={icon} className="h4 text-success" />}
    </Media>
    <Media body>{name}</Media>
  </Media>
)

const Experience = ({ from, to, logo, title, institution, description }) => (
  <Media className="mb-4">
    <Media
      left
      className="mr-3 text-muted small text-center"
      style={{ width: '5.5rem' }}
    >
      {from && <div>{from}</div>}
      <div>-</div>
      <div>{to || 'Present'}</div>
    </Media>
    <Media left className="mr-3" style={{ width: '5rem' }}>
      {logo && (
        <img src={logo} alt="PUC" className="img-responsive w-100 rounded" />
      )}
    </Media>
    <Media body>
      <div>
        <strong>{title}</strong>
      </div>
      {institution && <div>{institution}</div>}
      <div className="text-muted small">{description}</div>
    </Media>
  </Media>
)

const CV = () => (
  <MainLayout>
    <div>
      <div className="mb-4 text-center">
        <h2>Sebastián Patricio Soto Rojas</h2>
        <div className="small text-muted">
          <FontAwesome icon="home" className="text-primary" />{' '}
          <a
            href="https://sebastian.soto.sh"
            target="_blank"
            rel="noopener noreferrer"
          >
            sebastian.soto.sh
          </a>{' '}
          - <FontAwesome icon="phone" className="text-primary" /> +1 (510) 282
          2912 - <FontAwesome icon="envelope" className="text-primary" />{' '}
          <a href="mailto:sebastian@soto.sh">sebastian@soto.sh</a>
        </div>
      </div>
      <div className="mb-4 pt-4">
        <h3 className="mb-4">
          <FontAwesome icon="bars" className="mr-3 text-info" />Summary
        </h3>
        Generalist software engineer with proven experience in Ruby and Node.js
        stacks, and modern SPA frameworks like Angular, React and Vue. High
        motivation for sharing knowledge with the team and all the communitiy.
        From blog posts to high quality documentation, with attention to detail.
        Always looking forward for new challenges and solving them with the best
        possible practices.
      </div>

      <div className="mb-4 pt-4">
        <h3 className="mb-4">
          <FontAwesome icon="star" className="mr-3 text-info" />Highlights
        </h3>
        <Row>
          <Col className="mb-3">
            <div className="mb-2">
              <strong>Backend</strong>
            </div>

            <Technology name="Ruby: Rails, Sinatra" image={ruby} />
            <Technology name="NodeJS" image={node} />
            <Technology name="Python" image={python} />
            <Technology name="GraphQL" image={graphql} />
            <Technology name="PostgreSQL, MySQL, Mongo" image={postgres} />
          </Col>
          <Col className="mb-3">
            <div className="mb-2">
              <strong>Frontend</strong>
            </div>

            <Technology name="React" image={react} />
            <Technology name="Vue" image={vue} />
            <Technology name="Angular" image={angular} />
            <Technology name="GraphQL" image={graphql} />
            <Technology name="Webpack" image={webpack} />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <div className="mb-2">
              <strong>DevOps Techonologies</strong>
            </div>

            <Technology name="Linux and Bash Scripting" icon="terminal" />
            <Technology name="Webpack" image={webpack} />
            <Technology name="Basic AWS Ops" image={aws} />
            <Technology name="Docker" image={docker} />
            <Technology name="CI Tools: Jenkins / Drone CI" image={jenkins} />
          </Col>
          <Col className="mb-3">
            <div className="mb-2">
              <strong>Other</strong>
            </div>

            <ul className="m-0 pl-3">
              <li className="mb-3">Low level: C / C++. A bit of Swift.</li>
              <li className="mb-3">
                <em>Mid</em> level: Java. Learning Go.
              </li>
              <li className="mb-3">
                Experience maintaining existing applications.
              </li>
              <li className="mb-3">
                Development and architecture of new projects from scratch.
              </li>
              <li>
                High quality documentation, including comprehensive explanations
                and diagrams. LaTex, Markdown, LucidChart.
              </li>
            </ul>
          </Col>
        </Row>
      </div>

      <div className="mb-4 pt-4">
        <h3 className="mb-4">
          <FontAwesome icon="briefcase" className="mr-3 text-info" />Experience
        </h3>

        <Experience
          from="Oct 2018"
          logo={instacart}
          title="Senior Software Engineer"
          institution={
            <span>
              <a
                href="https://www.instacart.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instacart
              </a>{' '}
              - San Francisco, CA
            </span>
          }
          description={<div>Member of the Search & Discovery team.</div>}
        />

        <Experience
          from="Jun 2017"
          to="Sept 2018"
          logo={ubiome}
          title="Software Engineer"
          institution={
            <span>
              <a
                href="https://ubiome.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                uBiome
              </a>{' '}
              - San Francisco, CA / Santiago, Chile
            </span>
          }
          description={
            <div>
              Member of the <strong>Lab Tools Engineering Team</strong>.
              Highlights include:
              <ul className="pl-3">
                <li className="mt-1 mb-1">
                  <strong>
                    Maintaining an existing monolith for Laboratory Daily Ops
                  </strong>.
                  <br />
                  <span className="text-info">
                    <strong>Stack:</strong> Meteor, Mongo, MySQL, multiple REST
                    APIs.
                  </span>
                </li>
                <li className="mb-1">
                  <strong>
                    Design and development a new application from scratch for
                    the support of Daily Laboratory Operations
                  </strong>, and progresive migration of the features from the
                  previous one. This also includes migrating the existing
                  sensitive data from Mongo to a PostgreSQL database as well as
                  extensive documentation of the new implementations.
                  <br />
                  <span className="text-info">
                    <strong>Stack:</strong> NodeJS, GraphQL, React, Python,
                    PostgreSQL, Mongo and orchestration of multiple REST APIs.
                  </span>
                </li>
                <li className="mb-1">
                  Implementation and documentation of the <em>Dockerization</em>{' '}
                  of all NodeJS applications.
                </li>
                <li className="mb-1">
                  Support for multiple Laboratory data issues. The cause of
                  these issues was found and fixed on the application described
                  above.
                </li>
                <li className="mb-1">
                  Small contributions to Python-based microservices and Vue.JS
                  frontends of microapplications.
                </li>
                <li className="mb-1">
                  Development of multiple microapplications, highlighting a
                  system for assembling uBiome Kits, including batches
                  generation, stickers, and the assembly process validation.
                  <br />
                  <span className="text-info">
                    <strong>Stack:</strong> Python, React.
                  </span>
                </li>
              </ul>
            </div>
          }
        />

        <Experience
          from="Jul 2016"
          to="Jul 2017"
          logo={coddde}
          title="Junior Software Engineer"
          institution={
            <span>
              <a
                href="http://www.coddde.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coddde
              </a>{' '}
              - Santiago, Chile
            </span>
          }
          description={
            <div>
              As a software house, contribution to multiple projects. The
              projects to which I contributed most (60%+ contribution) are:
              <ul className="pl-3">
                <li className="mt-1 mb-1">
                  An analytics and marketing planner MVP for Kindle publishers.{' '}
                  <br />
                  <span className="text-info">
                    <strong>Stack:</strong> Ruby on Rails / Ember.JS.
                  </span>
                </li>
                <li className="mb-1">
                  A mobile payment system MVP for parking lots. <br />
                  <span className="text-info">
                    <strong>Stack:</strong> Ruby on Rails / Swift / React
                    Native.
                  </span>
                </li>
                <li className="mb-1">
                  A data processing system for computing analytics of daily
                  operations of a parking lot provider. <br />
                  <span className="text-info">
                    <strong>Stack:</strong> Ruby on Rails / React.
                  </span>
                </li>
                <li className="mb-1">
                  A form creation system, similar to Google Forms, to be
                  integrated on an existing product of an important US Customer.{' '}
                  <br />
                  <span className="text-info">
                    <strong>Stack:</strong> Angular 4 + React + React Native.
                  </span>
                </li>
                <li className="mb-1">
                  A graphical automation tool, similar to{' '}
                  <a
                    href="https://zapier.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zapier
                  </a>, for an important US based company. The MVP resulted on
                  Coddde becoming a vendor of this company. <br />
                  <span className="text-info">
                    <strong>Stack:</strong> Angular 4.
                  </span>
                </li>
              </ul>
            </div>
          }
        />

        <Experience
          from="Oct 2015"
          to="Ago 2016"
          title="Freelance Software Developer"
          description={
            <div>
              Full development of simple projects, highlighting:
              <ul className="pl-3">
                <li className="mt-1 mb-1">
                  Multiple landing pages.<br />
                  <span className="text-info">
                    <strong>Stack:</strong> PHP, Ruby On Rails, jQuery.
                  </span>
                </li>
                <li>
                  A scientific research papers repository for UC Alumni.<br />
                  <span className="text-info">
                    <strong>Stack:</strong> Ruby On Rails, jQuery.
                  </span>
                </li>
              </ul>
            </div>
          }
        />

        <Experience
          from="Jun 2015"
          to="Jul 2015"
          logo={puc}
          title="Undergraduate Research - Electronics"
          institution="Pontifical Catholic University of Chile - Santiago, Chile"
          description={
            <div>
              Design of system, electronics and embedded computer of a system
              for active vibration control in astronomical instruments.
            </div>
          }
        />

        <Experience
          from="Dic 2014"
          to="Mar 2015"
          logo={puc}
          title="Undergraduate Research - IT"
          institution="Pontifical Catholic University of Chile - Santiago, Chile"
          description={
            <div>
              Design and implementation of Pre-Calculus MOOCS for Engineering
              Students just joining the School. Multiple metrics for evaluating
              the implemented solution.
            </div>
          }
        />

        <Experience
          from="Mar 2013"
          to="Nov 2016"
          logo={puc}
          title="Course Assistant"
          institution="Pontifical Catholic University of Chile - Santiago, Chile"
          description={
            <div>
              Course Assistant in multiple courses, including Math Courses like
              Single Variable Calculus, Multivariable Calculus, Ordinary
              Differential Equations and Engineering courses like Signal and
              Systems, Control Theory and Embedded Systems.
            </div>
          }
        />
      </div>

      <div className="mb-4">
        <h3 className="mb-4">
          <FontAwesome icon="graduation-cap" className="mr-3 text-info" />Education
        </h3>
        <Experience
          from="Mar 2015"
          to="Dec 2016"
          logo={puc}
          title="Electronic Engineer - GPA: 3.7 (6.4 / 7.0)"
          institution="Pontifical Catholic University of Chile - Santiago, Chile"
          description={
            <div>
              Focus in Communications Theory, Control Theory, Embedded Systems,
              Digital Signal Processing, Image Processing (CV), Electronics and
              Astronomical Instrumentation.
            </div>
          }
        />

        <Experience
          from="Mar 2011"
          to="Dec 2014"
          logo={puc}
          title="Bachelor of Engineering Sciences - GPA: 3.7 (6.4 / 7.0)"
          institution="Pontifical Catholic University of Chile - Santiago, Chile"
          description={
            <div>
              Engineering Fundamentals with an ABET-based study program.
            </div>
          }
        />
      </div>
    </div>
  </MainLayout>
)

export default CV
