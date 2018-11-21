const path = require('path')
const { kebabCase, uniq } = require('lodash')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const PostTemplate = path.resolve(`src/templates/post.js`)
  const PostsTemplate = path.resolve(`src/pages/posts.js`)

  // Create Each Post Page From Markdown
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              path
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
    const previous = result.data.allMarkdownRemark.edges[i - 1]
    const next = result.data.allMarkdownRemark.edges[i + 1]

    createPage({
      path: node.frontmatter.path,
      component: PostTemplate,
      context: {
        previous: previous && {
          path: previous.node.frontmatter.path,
          title: previous.node.frontmatter.title,
        },
        next: next && {
          path: next.node.frontmatter.path,
          title: next.node.frontmatter.title,
        },
      },
    })
  })

  // Create Each Tag Page From Markdown
  const tags = uniq(
    result.data.allMarkdownRemark.edges.reduce(
      (acc, { node: { frontmatter: { tags = [] } = {} } }) => [...acc, ...tags],
      []
    )
  )

  tags.forEach(tag =>
    createPage({
      path: `/tags/${kebabCase(tag)}`,
      component: PostsTemplate,
      context: { tag },
    })
  )
}
