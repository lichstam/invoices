import React, { useEffect } from 'react';
import { useInvoices, useClients } from '../../hooks';
import Invoices from './components/Invoices';

const InvoiceOverview = () => {
  const { invoices, fetchInvoices } = useInvoices();
  const { clients, fetchClients } = useClients();

  useEffect(() => {
    if (!clients.length) fetchClients();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!invoices.length) fetchInvoices();
  }, []); // eslint-disable-line


  return (
    <div className="invoice-overview">
      <Invoices clients={clients} invoices={invoices} />
    </div>
  );
};

export default InvoiceOverview;
