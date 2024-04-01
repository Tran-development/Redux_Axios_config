import React from 'react'
import TableUsers from '../components/TableUsers';
import Home from '../components/Home';
import { Routes, Route, Link } from "react-router-dom"
import Login from '../components/Login.js';
import PrivateRoutes from './PrivateRoutes.js'
import NotFound from './NotFound.js'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/users'
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />}/>

      </Routes>
    </>
  )
}

export default AppRoutes