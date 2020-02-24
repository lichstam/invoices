import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';

const InputModal = ({
  showModal,
  toggleModal,
  onSubmit,
  inputs,
  title,
  initialValues,
}) => {
  const initialState = inputs.reduce((obj, item) => {
    const lowerCased = item.toLowerCase();
    obj[lowerCased] = ''; // eslint-disable-line
    return obj;
  }, {});

  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (initialValues) setData(initialValues);
  }, [setData, initialValues]);

  const handleOk = () => {
    const keys = Object.keys(data);
    if (keys.every((key) => data[key] !== '')) {
      onSubmit(data);
      toggleModal();
    }
  };

  return (
    <Modal
      title={title}
      visible={showModal}
      onOk={handleOk}
      confirmLoading={false}
      onCancel={toggleModal}
    >
      {inputs.map((item) => (
        <div key={item} className="input-modal__input-wrapper">
          <span className="input-modal__input-label">{item}</span>
          <Input
            value={data[item.toLowerCase()]}
            onChange={({ target }) => setData({ ...data, [item.toLowerCase()]: target.value })}
          />
        </div>
      ))}
    </Modal>
  );
};

export default InputModal;
