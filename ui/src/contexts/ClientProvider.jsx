import React, { useState } from 'react';

const ClientProviderContext = React.createContext([{}, () => {}]);

const ClientProvider = ({ children }) => {
  const [state, setState] = useState({});
  return (
    <ClientProviderContext.Provider value={[state, setState]}>
      {children}
    </ClientProviderContext.Provider>
  );
};

export { ClientProviderContext, ClientProvider };
