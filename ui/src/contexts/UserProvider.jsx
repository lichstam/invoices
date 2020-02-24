import React, { useState } from 'react';

const UserProviderContext = React.createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
  const [state, setState] = useState({});
  return (
    <UserProviderContext.Provider value={[state, setState]}>
      {children}
    </UserProviderContext.Provider>
  );
};

export { UserProviderContext, UserProvider };
