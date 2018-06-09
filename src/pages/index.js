import React from 'react'
import Link from 'gatsby-link'
import { Alert, Button, Col, Row } from 'reactstrap'

import LatestPosts from '../components/latest-posts'
import FontAwesome from '../components/fontawesome'

const IndexPage = ({ data: { allMarkdownRemark } }) => (
  <div>
    <Row className="mb-4">
      <Col xs={12} md={6}>
        <h2 className="mb-4">Hello!</h2>
        <p>
          I'm an electronic engineer from Santiago, Chile, currently working as
          a Full Stack Software Developer.
        </p>
        <p>
          I currently work as a <strong>Software Engineer</strong> at{' '}
          <a
            href="https://ubiome.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            uBiome
          </a>, a citizen science microbiome company. I'm also always open to
          listening for interesting challenges on my free time.
        </p>
        <p>
          This is my personal space, and I use it for contributing with posts
          ranging from web development, electronics, math to even music or
          cooking.
        </p>
      </Col>
      <Col xs={12} md={6}>
        <h2 className="mb-4">Latest posts</h2>
        <LatestPosts posts={allMarkdownRemark.edges} />
        <div className="text-center">
          <Button tag={Link} to="/posts" color="primary">
            See all
          </Button>
        </div>
      </Col>
    </Row>

    <div className="mt-4">
      <h2 className="mb-4">Work Experience</h2>

      <p>
        I have experience working with multiple modern development technologies,
        including ES6 JS, Ruby and Python, using frameworks as libraries as
        required by the problem.
      </p>

      <p>
        I also work with many software engineering practices, including Agile
        metodologies, CI/CD (in Jenkins / Docker), logging (ELK),
        containerization (Docker) and 12FAs.
      </p>

      <p>
        My current interests range from GraphQL, Server Side Rendering,
        Functional Languages like Elixir, Automation Tools like Bash Scripting
        and Ansible, and Container Orchestration tools like Kubernetes.
      </p>

      <Alert color="info" className="text-center mt-4">
        Do you want to talk about a technology or an interesting project?{' '}
        <Link to="/contact" className="alert-link">
          <FontAwesome icon="envelope" className="mr-1" />Let's talk!
        </Link>
      </Alert>
    </div>
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query LatestPosts {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`