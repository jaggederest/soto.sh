import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { kebabCase, uniq } from 'lodash'

import MainLayout from '../layouts/main'

const PostLink = ({ post }) => (
  <div className="serif mb-4">
    <Link to={post.frontmatter.path} className="h3 post-link">
      {post.frontmatter.title}
    </Link>
    <div className="text-muted">{post.frontmatter.date}</div>
  </div>
)

const IndexPage = ({
  pageContext: { tag: currentTag } = {},
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges
    .filter(
      ({ node }) =>
        !currentTag ||
        !node.frontmatter.tags ||
        node.frontmatter.tags.includes(currentTag)
    )
    .map(edge => (
      <div key={edge.node.id}>
        <PostLink post={edge.node} />
      </div>
    ))

  const tags = uniq(
    edges.reduce(
      (
        acc,
        {
          node: {
            frontmatter: { tags = [] },
          },
        }
      ) => [...acc, ...tags],
      []
    )
  )

  return (
    <MainLayout>
      <div>
        <div className="text-center mb-4 small">
          <Link to="/posts" className="ml-1 mr-1">
            [All]
          </Link>
          {tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${kebabCase(tag)}`}
              className="ml-1 mr-1"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h2 className="mb-4">{currentTag || 'All Posts'}</h2>
        {posts}
      </div>
    </MainLayout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            tags
          }
        }
      }
    }
  }
`
