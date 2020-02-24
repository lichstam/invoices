import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import Box from '../../../../../../components/Box';
import InputModal from '../../../../../../components/InputModal';
import { useClients } from '../../../../../../hooks';
import { putClient, postClient } from '../../../../../../api';

const inputs = ['Name', 'Street', 'City', 'State', 'Country', 'Zipcode'];

const { Option } = Select;

const Client = ({ onChangeClient, selectedClient }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { fetchClients, clients } = useClients();

  useEffect(() => {
    if (!clients.length) fetchClients();
  }, []); // eslint-disable-line

  const toggleAddModal = () => setShowAddModal((prevState) => !prevState);
  const toggleEditModal = () => setShowEditModal((prevState) => !prevState);

  const handleSubmitEdit = ({ _id, ...data }) => {
    putClient(_id, data).then(fetchClients);
  };

  const handeSubmitAdd = (data) => {
    postClient(data).then(({ _id }) => fetchClients().then(() => onChangeClient(_id)));
  };

  return (
    <Box>
      <div className="invoice-form__wrapper">
        <h4>Your client</h4>
        <Select onChange={onChangeClient} value={selectedClient} className="invoice-form__select">
          {clients.map((item) => (
            <Option
              key={item._id}
              value={item._id}
            >
              {item.name}
            </Option>
          ))}
        </Select>
        <Button onClick={toggleEditModal} className="invoice-form__button">Edit</Button>
        <Button onClick={toggleAddModal} className="invoice-form__button" type="primary">Add</Button>
      </div>
      <InputModal
        title="Add Client"
        toggleModal={toggleAddModal}
        showModal={showAddModal}
        inputs={inputs}
        onSubmit={handeSubmitAdd}
        intitalValues={{}}
      />
      <InputModal
        title="Edit Client"
        toggleModal={toggleEditModal}
        showModal={showEditModal}
        inputs={inputs}
        onSubmit={handleSubmitEdit}
        initialValues={clients.find((client) => client._id === selectedClient)}
      />
    </Box>
  );
};

export default Client;
