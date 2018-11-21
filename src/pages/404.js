import React from 'react'
import Link from 'gatsby-link'

import MainLayout from '../layouts/main'
import FontAwesome from '../components/fontawesome'

const NotFoundPage = () => (
  <MainLayout>
    <div className="text-center">
      <h1 className="text-danger">
        <FontAwesome icon="times" />
      </h1>
      <h2 className="mb-4">Not Found</h2>
      <p>
        The page you're trying to access doesn't exist or is no longer
        available.
      </p>
      <p>
        If you think this is an error, please <Link to="/contact">contact</Link>{' '}
        me.
      </p>
    </div>
  </MainLayout>
)

export default NotFoundPage
