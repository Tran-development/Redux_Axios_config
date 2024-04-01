import React from 'react'
import Alert from 'react-bootstrap/Alert';

const NotFound = () => {
  return (
    <Alert className='mt-5'>
        <Alert.Heading>404</Alert.Heading>
        <p>
          Not found.
        </p>
        <hr />
      </Alert>
  )
}

export default NotFound