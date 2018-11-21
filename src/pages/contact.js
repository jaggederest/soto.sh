import React from 'react'

import MainLayout from '../layouts/main'
import FontAwesome from '../components/fontawesome'

const Contact = () => (
  <MainLayout>
    <div>
      <h2 className="mb-4">Contact Me</h2>
      <div className="text-center mt-4 mb-4">
        <div className="mb-4">A contact form coming soon. In the meantime:</div>
        <div className="h1 mb-4">
          <a
            href="https://www.linkedin.com/in/spsoto/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesome
              brand={true}
              icon="linkedin"
              className="ml-3 mr-3 text-info"
            />
          </a>
          <a
            href="https://twitter.com/spsotor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesome
              brand={true}
              icon="twitter"
              className="ml-3 mr-3 text-primary"
            />
          </a>
          <a href="https://github.com/spsoto" rel="noopener noreferrer">
            <FontAwesome
              brand={true}
              icon="github"
              className="ml-3 mr-3 text-dark"
            />
          </a>
        </div>
      </div>
    </div>
  </MainLayout>
)

export default Contact
