import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/header'
import Footer from '../components/footer'

import '../styles/index.scss'

const MainLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="container pt-4 pb-4">{children}</div>
        <Footer siteTitle={data.site.siteMetadata.title} />
      </div>
    )}
  />
)

export default MainLayout
