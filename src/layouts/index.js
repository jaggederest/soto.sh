import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'

import '../styles/index.scss'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div className="container pt-4 pb-4">{children()}</div>
    <Footer siteTitle={data.site.siteMetadata.title} />
  </div>
)

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
