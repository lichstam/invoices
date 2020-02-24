import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../hooks';

const PublicRoute = ({ component: ProvidedComponent, ...rest }) => {
  const { user } = useUser();
  const userIsEmpty = Object.keys(user).length === 0;
  return (
    <Route
      {...rest}
      render={(props) => (userIsEmpty ? (
        <ProvidedComponent {...props} />
      ) : (
        <Redirect to={{ pathname: '/invoices' }} />
      ))}
    />
  );
};

export default PublicRoute;
