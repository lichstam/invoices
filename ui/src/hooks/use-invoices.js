import { useContext, useCallback } from 'react';
import { InvoiceProviderContext } from '../contexts';
import { getAllInvoices } from '../api';

const useInvoices = () => {
  const [state, setState] = useContext(InvoiceProviderContext);

  const setInvoices = useCallback(
    (invoices) => setState((prevState) => ({ ...prevState, invoices })), [setState],
  );

  const addInvoice = (invoice) => {
    setState((prevState) => ({ ...prevState, invoices: [...prevState.invoices, invoice] }));
  };

  const fetchInvoices = useCallback(() => getAllInvoices().then((setInvoices)), [setInvoices]);

  return {
    invoices: state.invoices || [],
    fetchInvoices,
    addInvoice,
  };
};

export default useInvoices;
