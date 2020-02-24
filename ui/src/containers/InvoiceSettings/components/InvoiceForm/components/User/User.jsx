import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import Box from '../../../../../../components/Box';
import InputModal from '../../../../../../components/InputModal';
import { useClients } from '../../../../../../hooks';
import { putUser } from '../../../../../../api';

const inputs = ['Name', 'Street', 'City', 'State', 'Country', 'Zipcode', 'Website', 'Number'];

const { Option } = Select;

const User = ({ onChangeClient, selectedClient }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { fetchClients, clients } = useClients();

  useEffect(() => {
    if (!clients.length) fetchClients();
  }, []); // eslint-disable-line

  const toggleEditModal = () => setShowEditModal((prevState) => !prevState);

  const handleSubmitEdit = ({ _id, ...data }) => {
    putUser(_id, data).then(fetchClients);
  };

  return (
    <Box>
      <div className="invoice-form__user">
        <div>
          {userId}
        </div>
        <Button className="invoice-form__button">Edit</Button>
      </div>
      <InputModal
        title="Edit User"
        toggleModal={toggleEditModal}
        showModal={showEditModal}
        inputs={inputs}
        onSubmit={handleSubmitEdit}
        initialValues={clients.find((client) => client._id === selectedClient)}
      />
    </Box>
  );
};

export default User;
