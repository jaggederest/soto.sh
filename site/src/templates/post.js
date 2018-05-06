import React, { Component } from 'react'
import Link from 'gatsby-link'
import { kebabCase } from 'lodash'
import { Col, Row } from 'reactstrap'

import FontAwesome from '../components/fontawesome'

const enhance = C =>
  class extends Component {
    script = undefined

    componentDidMount() {
      // Let's keep things private in development
      if (process.env.NODE_ENV !== 'production') return

      const {
        data: {
          markdownRemark: {
            frontmatter: { path, title, rawDate },
          },
        },
      } = this.props

      // Probably we'll need to figure out a way to
      // remove when the page is closed.
      //
      // However, is not breaking anything so let's leave
      // it as is at the moment.
      window.disqus_config = function() {
        this.page.url = `${process.env.SITE_BASE_URL}${path}`
        this.page.identifier = kebabCase(`${rawDate}-${title}`)
      }.bind(window)

      const script = document.createElement('script')
      script.src = process.env.DISQUS_EMBED_URL
      script.setAttribute('data-timestamp', +new Date())

      const target = document.head || document.body
      target.appendChild(script)
    }

    render() {
      return <C {...this.props} />
    }
  }

function PostTemplate({ pathContext: { previous, next } = {}, data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <div className="post">
      <div className="mb-4">
        <h1>{frontmatter.title}</h1>
        <h5 className="text-muted">{frontmatter.date}</h5>
        {frontmatter.tags.length > 0 && (
          <div className="small">
            <span className="mr-1">Tags:</span>
            {frontmatter.tags.map(tag => (
              <Link
                key={tag}
                to={`/tags/${kebabCase(tag)}`}
                className="ml-1 mr-1"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div
        className="blog-post-content mb-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {(previous || next) && (
        <Row className="mt-4 pt-4 mb-4 pb-4">
          <Col xs={12} md={6}>
            {previous && (
              <div>
                <div className="small text-muted">
                  <FontAwesome icon="long-arrow-alt-left" /> Previous
                </div>
                <Link to={previous.path} className="h5 post-link">
                  {previous.title}
                </Link>
              </div>
            )}
          </Col>

          <Col xs={12} md={6} className="text-md-right">
            {next && (
              <div>
                <div className="small text-muted">
                  Next <FontAwesome icon="long-arrow-alt-right" />
                </div>
                <Link to={next.path} className="h5 post-link">
                  {next.title}
                </Link>
              </div>
            )}
          </Col>
        </Row>
      )}

      {process.env.NODE_ENV === 'production' &&
        frontmatter.commentsDisabled !== 'true' && (
          <div className="mt-4 pt-4">
            <h2 className="mb-4">Comments</h2>
            <div id="disqus_thread" />
          </div>
        )}
    </div>
  )
}

export default enhance(PostTemplate)

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        rawDate: date
        path
        title
        tags
      }
    }
  }
`
