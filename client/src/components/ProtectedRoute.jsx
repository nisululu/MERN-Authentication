import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({currentUser}) => {
  return (
    currentUser.username ? <Outlet /> : <Navigate to='/sign-in'/> 
  )
}

export default ProtectedRoute
