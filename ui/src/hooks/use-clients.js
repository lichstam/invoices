import { useContext, useCallback } from 'react';
import { ClientProviderContext } from '../contexts';
import { getAllClients } from '../api';

const useClients = () => {
  const [state, setState] = useContext(ClientProviderContext);

  const setClients = useCallback(
    (clients) => setState((prevState) => ({ ...prevState, clients })), [setState],
  );

  const addClient = (client) => {
    setState((prevState) => ({ ...prevState, clients: [...prevState.clients, client] }));
  };

  const fetchClients = useCallback(() => getAllClients().then((setClients)), [setClients]);

  return {
    clients: state.clients || [],
    fetchClients,
    addClient,
  };
};

export default useClients;
