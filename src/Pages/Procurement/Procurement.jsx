import { useState, useContext } from "react";
import {
  AdminTable,
  AddProcurement,
  UpdateProcurement,
} from "../../components";
import { Space, Popconfirm, Input } from "antd";
import { arraySlice, onSearch } from "../../Utils/ReusableSyntax";
import { Edit3, Trash2, PlusCircle } from "react-feather";
import { ProcurementContext } from "../../Context/ProcurementProvider";
import { app } from "../../config/firebase";

export default function Procurement() {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpnUpdate] = useState(false);
  const [id, setId] = useState("");
  const [searchFilter, setSearchFilter] = useState(null);
  const [current, setCurrent] = useState(1);

  const { fetchProcurement } = useContext(ProcurementContext);

  const isToggle = (event) => {
    event.preventDefault();
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const isUpdateToggle = (event, id) => {
    event.preventDefault();
    if (!openUpdate) {
      setOpnUpdate(true);
      setId(id);
    } else {
      setOpnUpdate(false);
    }
  };

  const deleteProcure = (event, id) => {
    event.preventDefault();
    const document = app.firestore().collection("procurement").doc(id);
    id && document.delete();
  };

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
      title: "Procurement Date",
      dataIndex: "procurementDate",
      key: "ownersName",
    },
    {
      title: "Palay Variety",
      dataIndex: "palayVariety",
      key: "palayVariety",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "pricePerKilo",
      key: "pricePerKilo",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Farmer Name",
      dataIndex: "farmerName",
      key: "farmerName",
    },
    {
      title: "Action",
      key: "action",
      render: (procurement) => {
        return (
          <Space size="middle" key="action">
            <Popconfirm
              title="would you like to continue?"
              onConfirm={(event) => isUpdateToggle(event, procurement.id)}
            >
              <Edit3
                className="text-blue-700 cursor-pointer"
                size="20"
                id="update"
              />
            </Popconfirm>
            <Popconfirm
              title="Do you want to delete?"
              onConfirm={(event) => deleteProcure(event, procurement.id)}
            >
              <Trash2 className="text-red-700 cursor-pointer" size="20" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //** Data showed to the client
  const dataShowed = 5;
  const currentData = arraySlice(fetchProcurement, current, dataShowed);

  return (
    <div className="max-w-content mx-auto px-4 bg-gray-100">
      {open && (
        <AddProcurement isOpen={open} isClose={(event) => isToggle(event)} />
      )}
      {openUpdate && (
        <UpdateProcurement
          isOpen={openUpdate}
          isClose={(event) => isUpdateToggle(event)}
          id={id}
        />
      )}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Procurement</h1>
        <div className="mb-4">
          <div className="flex justify-between mb-3 md:mb-0">
            <button
              onClick={(event) => isToggle(event)}
              type="button"
              id="add"
              className="flex items-center gap-2 py-1 px-5 bg-primary hover:bg-primary-slight text-white font-semibold rounded-sm shadow-lg"
            >
              <PlusCircle size="20" />
              Add Information
            </button>
            <Input.Search
              allowClear
              className="w-full md:max-w-xs"
              placeholder="Search..."
              onSearch={(nameSearch) => {
                const sea = onSearch(nameSearch, fetchProcurement);
                setSearchFilter(sea);
              }}
            />
          </div>
        </div>
        <AdminTable
          searchFilter={searchFilter}
          columns={columns}
          currentData={currentData}
          DataArray={fetchProcurement}
          current={current}
          setCurrent={setCurrent}
          dataShowed={dataShowed}
        />
      </div>
    </div>
  );
}
