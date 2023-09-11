import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingContext } from '../../contexts/LoadingContext';


const ProtectedRoute = ({element: Component, ...props}) => {

  const isLoading = React.useContext(LoadingContext);
  
  return (
    isLoading
    ? <Component {...props} />
    : props.loggedIn
      ? <Component {...props} />
      : <Navigate to="/" />
  )
  
}


export default ProtectedRoute;