import React, { useState } from 'react';
import { Button, Select } from 'antd';
import Box from '../../../../../../components/Box';
import InputModal from '../../../../../../components/InputModal';
import { currencies } from '../../../../../../fakeData';
import Items from '../Items';

const { Option } = Select;

const inputs = ['Name', 'Description', 'Price', 'Rate'];

const Services = ({
  onAddItem,
  onSelectItems,
  onSelectCurrency,
  allItems,
  selectedItems,
  selectedCurrency,
  onRemove,
}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prevState) => !prevState);

  const handleAddItem = (data) => {
    const { rate, price } = data;
    const nextData = { ...data, amount: rate * price };
    onAddItem((prevState) => [...prevState, nextData]);
  };

  return (
    <Box>
      <div className="services">
        <h4>Product/Services</h4>
        <div className="services__currency">
          <span>Currency</span>
          <Select
            onChange={onSelectCurrency}
            defaultValue={selectedCurrency}
            className="services__select"
          >
            {currencies.map((item) => (
              <Option
                key={item}
                value={item}
              >
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className="services__items">
          <h4>Items</h4>
          {allItems.length ? (
            <Items
              currency={selectedCurrency}
              onChange={onSelectItems}
              items={allItems}
              selectedItems={selectedItems}
            />
          ) : 'No items yet' }
          <div className="services__button-wrapper">
            <Button type="primary" onClick={toggleModal} className="services__button">Add Item</Button>
            <Button type="danger" onClick={onRemove} disabled={!selectedItems.length} className="services__button">Remove selected</Button>
          </div>
        </div>
        <InputModal
          toggleModal={toggleModal}
          showModal={showModal}
          onSubmit={handleAddItem}
          title="Create Item"
          inputs={inputs}
        />
      </div>
    </Box>
  );
};

export default Services;
