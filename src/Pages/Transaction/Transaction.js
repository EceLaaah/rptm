import { useState } from "react";
import { Tag, Space, Popconfirm, Input } from "antd";
import { AdminTable } from "../../components";
import { transactionFarmer } from "../../mock/data";
import { arraySlice, onSearch } from "../../Utils/ReusableSyntax";
import { Edit3, Trash2 } from "react-feather";

export default function Transaction() {
  const [searchFilter, setSearchFilter] = useState(null);
  const [current, setCurrent] = useState(1);

  const columns = [
    {
      title: "Unique Identification",
      dataIndex: "id",
      key: "id",
      render: (text) => {
        return <span className="text-blue-500">{text}</span>;
      },
    },
    {
      title: "Owners Name",
      dataIndex: "ownersName",
      key: "ownersName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price Per Kilo",
      dataIndex: "pricePerKilo",
      key: "pricePerKilo",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Rice variety",
      dataIndex: "variety",
      key: "variety",
    },
    {
      title: "Buyers Name",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (transactionDate) => {
        return (
          <Tag color="geekblue" key={transactionDate}>
            {transactionDate}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (transaction) => {
        return (
          <Space size="middle" key="action">
            <Popconfirm title="would you like to continue?">
              <Edit3
                className="text-blue-700 cursor-pointer"
                size="20"
                id="update"
              />
            </Popconfirm>
            <Popconfirm title="Do you want to delete?">
              <Trash2 className="text-red-700 cursor-pointer" size="20" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //** Data showed to the client
  const dataShowed = 5;
  const currentData = arraySlice(transactionFarmer, current, dataShowed);

  return (
    <div className="max-w-content mx-auto px-4 bg-gray-100">
      <h1 className="text-2xl mb-4 font-semibold">Transaction History</h1>
      <div className="text-right mb-4">
        <Input.Search
          allowClear
          className="w-full md:max-w-xs"
          placeholder="Search by firstname"
          onSearch={(nameSearch) => {
            const sea = onSearch(nameSearch, transactionFarmer);
            setSearchFilter(sea);
          }}
        />
      </div>
      <AdminTable
        searchFilter={searchFilter}
        columns={columns}
        currentData={currentData}
        DataArray={transactionFarmer}
        current={current}
        setCurrent={setCurrent}
        dataShowed={dataShowed}
      />
    </div>
  );
}
