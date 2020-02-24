import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import CreateInvoice from './components/CreateInvoice';
import Box from '../../../../components/Box';
import { useUser } from '../../../../hooks'


const Invoices = ({ clients, invoices }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prevState) => !prevState);
  const { setUser } = useUser()

  const getClientName = (clientId) => clients.find((item) => clientId === item._id)?.name;
  const onInvoiceClick = (id) => history.push(`/invoices/settings/${id}`);

  const logout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    setUser({})
  }

  return (
    <>
      <div className="invoices__header">
        <h2>Invoices</h2>
        <Button className="invoices__logout" onClick={logout} type="ghost">Log out</Button>
        <Button className="invoices__create" onClick={toggleModal} type="primary">Create new</Button>
      </div>
      <Box>
        {invoices.map(({ _id, clientId }) => (
          <button
            type="button"
            key={_id}
            className="invoices__item"
            onClick={() => onInvoiceClick(_id)}
          >
            Invoice id:
            {' '}
            <b>{_id}</b>
            {' '}
            | Client:
            {' '}
            <b>{getClientName(clientId)}</b>
          </button>
        ))}
      </Box>
      <CreateInvoice
        showModal={showModal}
        toggleModal={toggleModal}
        clients={clients}
      />
    </>
  );
};

export default Invoices;
