import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider, ClientProvider, InvoiceProvider } from './contexts';
import Routes from './routes';
import './styles/index.scss';

function App() {
  return (
    <div className="app">
      <UserProvider>
        <ClientProvider>
          <InvoiceProvider>
            <Router>
              <Routes />
            </Router>
          </InvoiceProvider>
        </ClientProvider>
      </UserProvider>
    </div>
  );
}

export default App;
