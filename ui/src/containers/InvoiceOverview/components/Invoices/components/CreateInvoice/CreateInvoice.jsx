import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { useInvoices } from '../../../../../../hooks';
import {
  userList,
  currencies,
  taxes,
} from '../../../../../../fakeData';
import { postInvoice } from '../../../../../../api';

const { Option } = Select;

const CreateInvoice = ({
  showModal,
  toggleModal,
  clients,
}) => {
  const firstClientInTheList = clients[0]?._id
  const [userId, setUserId] = useState(userList[0].userId);
  const [clientId, setClientId] = useState(firstClientInTheList);
  const [currency, setCurrency] = useState(currencies[0]);
  const [tax, setTax] = useState(taxes[0]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { addInvoice } = useInvoices();

  const onCreateClick = () => {
    setLoading(true);
    postInvoice({
      userId,
      clientId,
      currency,
      taxInPercent: tax,
    }).then((nextInvoice) => {
      addInvoice(nextInvoice);
      setLoading(false);
      history.push(`/invoices/settings/${nextInvoice._id}`);
    });
  };

  return (
    <Modal
      title="Create Invoice"
      visible={showModal}
      onOk={onCreateClick}
      confirmLoading={loading}
      onCancel={toggleModal}
    >
      <div className="invoices__pick">
        <span className="invoices__label">User</span>
        <Select value={userId} onSelect={(val) => setUserId(val)} defaultValue={userId} className="invoice-form__select">
          {userList.map((item) => <Option key={item.userId} value={item.userId}>{item.name}</Option>)}
        </Select>
      </div>
      <div className="invoices__pick">
        <span className="invoices__label">Client</span>
        <Select defaultValue={firstClientInTheList} onSelect={(val) => setClientId(val)} className="invoice-form__select">
          {clients.map((item) => (
            <Option
              key={item._id}
              value={item._id}
            >
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="invoices__pick">
        <span className="invoices__label">Currency</span>
        <Select defaultValue={currency} onSelect={(val) => setCurrency(val)} className="invoice-form__select">
          {currencies.map((item) => <Option key={item} value={item}>{item}</Option>)}
        </Select>
      </div>
      <div className="invoices__pick">
        <span className="invoices__label">Tax</span>
        <Select defaultValue={tax} onSelect={(val) => setTax(val)} className="invoice-form__select">
          {taxes.map((item) => (
            <Option key={item} value={item}>
              {item}
              %
            </Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default CreateInvoice;
