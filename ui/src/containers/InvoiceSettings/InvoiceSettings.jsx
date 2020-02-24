import React, { useEffect } from 'react';
import { useInvoices } from '../../hooks';
import InvoiceForm from './components/InvoiceForm';

const InvoiceSettings = ({ match }) => {
  const { id } = match.params;
  const { invoices, fetchInvoices } = useInvoices();
  const invoice = invoices.find(({ _id }) => _id === id);

  useEffect(() => {
    if (!invoices.length) fetchInvoices();
  }, []); // eslint-disable-line

  return (
    <div className="invoice-settings">
      {invoices.length && <InvoiceForm id={id} invoice={invoice} />}
    </div>
  );
};

export default InvoiceSettings;
