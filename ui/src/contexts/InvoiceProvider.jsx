import React, { useState } from 'react';

const InvoiceProviderContext = React.createContext([{}, () => {}]);

const InvoiceProvider = ({ children }) => {
  const [state, setState] = useState({});
  return (
    <InvoiceProviderContext.Provider value={[state, setState]}>
      {children}
    </InvoiceProviderContext.Provider>
  );
};

export { InvoiceProviderContext, InvoiceProvider };
