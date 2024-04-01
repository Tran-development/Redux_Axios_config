import React, { useContext } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import { UserContext } from '../context/userContext';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';

const PrivateRoutes = (props) => {
 
  const user = useSelector(state => state.user.account)

  if (user && !user.auth) {
    return <>
      <Alert variant="danger" className='mt-5'>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          You don't have permission to access this page.
        </p>
      </Alert>
    </>
  } else if (user && user.auth) {
    return (
      <>
        {props.children}
      </>
    )
  }
}

export default PrivateRoutes