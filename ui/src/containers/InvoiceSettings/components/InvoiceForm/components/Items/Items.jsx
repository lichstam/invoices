import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
];

const mapKeys = (items) => items.map((item, i) => ({ ...item, key: i }));
const getTotal = (items) => items.reduce((total, item) => total + Number(item.amount), 0);

const Items = ({
  currency, items, onChange, selectedItems,
}) => {
  const rowSelection = {
    onChange,
    selectedRowKeys: selectedItems,
  };

  return (
    <div className="items">
      <Table
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={mapKeys(items)}
      />
      <span className="items__total">
        Total:
        <b>
          {getTotal(items)}
          {' '}
          {currency}
        </b>
      </span>
    </div>
  );
};

export default Items;
