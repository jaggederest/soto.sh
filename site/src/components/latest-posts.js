import React from 'react'
import Link from 'gatsby-link'

const PostLink = ({ post }) => (
  <div className="serif mb-3">
    <Link to={post.frontmatter.path} className="h4 post-link">
      {post.frontmatter.title}
    </Link>
    <div className="small text-muted">{post.frontmatter.date}</div>
  </div>
)

const LatestPosts = ({ posts: edges }) => {
  const posts = edges.map((edge, i) => <PostLink key={i} post={edge.node} />)

  return <div className="mb-4">{posts}</div>
}

export default LatestPosts
