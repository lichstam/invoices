import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import routeList from './route-list';
import { useUser } from '../hooks';

const Routes = () => {
  const [checkedLoggedIn, setCheckedLoggedIn] = useState(false);
  const { setUser } = useUser();
  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        setUser(user);
      }
    } catch (err) {
      console.log(err);
    }
    setCheckedLoggedIn(true);
  }, [setCheckedLoggedIn, setUser]);


  return (
    <Switch>
      <>
        { checkedLoggedIn && routeList.map((
          {
            path,
            Component,
            label,
            type,
            exact,
          },
        ) => (
          type === 'public'
            ? (
              <PublicRoute
                key={`${label}${path}`}
                exact={exact}
                component={Component}
                path={path}
                pathLabel={label}
              />
            )
            : (
              <PrivateRoute
                key={`${label}${path}`}
                exact={exact}
                component={Component}
                path={path}
                pathlabel={label}
              />
            )


        ))}
      </>
    </Switch>
  );
};

export default Routes;
