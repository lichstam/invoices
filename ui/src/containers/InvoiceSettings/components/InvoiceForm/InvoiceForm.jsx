import React, { useState } from 'react';
import { Input, Button } from 'antd';
import download from 'downloadjs';
import Box from '../../../../components/Box';
import Services from './components/Services';
import Client from './components/Client';
import { postPDF, putInvoice } from '../../../../api';
import { useInvoices, useClients } from '../../../../hooks';
import getObjectToGenerate from './get-object-to-generate';

const { TextArea } = Input;

const InvoiceForm = ({ invoice, id }) => {
  const {
    revisions, clientId, userId, currency,
  } = invoice;
  const lastRevision = revisions[revisions.length - 1];
  const { fetchInvoices } = useInvoices();
  const { clients } = useClients();

  const lastRevisionItems = (lastRevision && lastRevision.items) || [];
  const lastRevisionTerms = (lastRevision && lastRevision.terms) || '';

  const [newItems, setNewItems] = useState(lastRevisionItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedClient, setSelectedClient] = useState(clientId);
  const [selectedCurrency, setSeletedCurrency] = useState(currency);
  const [terms, setTerms] = useState(lastRevisionTerms);

  const handleRemoveItems = () => {
    const nextNewItems = newItems.filter((_, i) => selectedItems.every((toRemove) => toRemove !== i));
    setNewItems(nextNewItems);
    setSelectedItems([]);
  };

  const isItemSame = newItems.every(({
    name,
    description,
    price,
    rate,
    amount,
  }) => lastRevisionItems.some((item) => (
    item.name === name
              && item.description === description
              && item.price === +price
              && item.rate === +rate
              && item.amount === +amount
  )));

  const isTermsDirty = lastRevisionTerms !== terms;
  const isItemsDirty = newItems.length !== lastRevisionItems.length;
  const isRevisionDirty = isTermsDirty || isItemsDirty || !isItemSame;
  const isCurrencyDirty = selectedCurrency !== currency;
  const isClientDirty = selectedClient !== clientId;
  const isSettingsDirty = isCurrencyDirty || isClientDirty;

  const generatePDF = async () => {
    const client = clients.find((item) => item._id === clientId);
    // client and user same because no user yet
    const toGenerate = getObjectToGenerate({ invoice, client, user: client });
    const pdf = await postPDF(toGenerate);
    download(new Blob([pdf]), 'invoice.pdf', 'application/pdf');
  };

  const onSubmit = () => {
    const settings = { clientId: selectedClient, currency: selectedCurrency };
    const revision = isRevisionDirty
      ? { items: newItems, terms } : undefined;
    putInvoice(id, { settings, revision })
      .then(() => fetchInvoices());
  };

  return (
    <>
      <h2>Edit your Invoice</h2>
      <Box>
        <div className="invoice-form__user">
          <div>
            {userId}
          </div>
          <Button className="invoice-form__button">Edit</Button>
        </div>
      </Box>
      <Client onChangeClient={setSelectedClient} selectedClient={selectedClient} />
      <Services
        allItems={newItems}
        onSelectItems={setSelectedItems}
        onSelectCurrency={setSeletedCurrency}
        onAddItem={setNewItems}
        selectedCurrency={selectedCurrency}
        selectedItems={selectedItems}
        onRemove={handleRemoveItems}
      />
      <Box>
        <div className="invoice-form__wrapper">
          <h4>Terms</h4>
          <TextArea value={terms} onChange={({ target }) => setTerms(target.value)} />
        </div>
      </Box>
      <div className="invoice-form__button-wrapper">
        <Button
          disabled={!isRevisionDirty && !isSettingsDirty}
          onClick={onSubmit}
          className="invoice-form__save-button"
          type="primary"
        >
          Save
        </Button>
        <Button
          disabled={!lastRevisionItems.length}
          onClick={generatePDF}
          className="invoice-form__save-button"
        >
          Generate PDF
        </Button>
      </div>
    </>
  );
};

export default InvoiceForm;
