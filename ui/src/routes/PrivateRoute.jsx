import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../hooks';

const PrivateRoute = ({ component: ProvidedComponent, ...rest }) => {
  const { user } = useUser();
  const userIsEmpty = Object.keys(user).length === 0;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userIsEmpty) {
          return <Redirect to={{ pathname: '/register' }} />;
        }
        return (
          <ProvidedComponent {...props} />
        );
      }}
    />
  );
};

export default PrivateRoute;
