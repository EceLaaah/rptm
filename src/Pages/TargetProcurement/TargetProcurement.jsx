import { useState, useContext } from 'react';
import { Trash2, } from "react-feather"
import { AdminTable } from '../../components';
import { TargetProcurementContext } from '../../Context/TargetProcurementProvider'
import { Space, Popconfirm, Tag, Input, Divider } from "antd";
import { arraySlice, onSearch } from "../../Utils/ReusableSyntax";
import swal from 'sweetalert';
import { withRouter, useHistory } from 'react-router-dom';
import { app } from '../../config/firebase'

const TargetProcurement = () => {
  const [current, setCurrent] = useState(1);
  const { target } = useContext(TargetProcurementContext);
  const [searchFilter, setSearchFilter] = useState(null);
  const history = useHistory();

  const isDelete = (event, id) => {
    event.preventDefault();
    const document = id && app.firestore().collection("targetProcurement").doc(id)
    id && document.delete().then(() => {
      swal({
        title: "Success",
        text: `Successfully Deleted`,
        icon: "success",
        button: "Ok",
      });
    })
  }

  const nextPage = (event, id) => {
    event.preventDefault();
    id && history.push(`/productPurchased?targetId=${id}`)
  }

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
      title: "Target Number",
      dataIndex: "targetNumber",
      key: "targetNumber",
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      render: (date_created) => {
        return (
          <Tag color="geekblue">
            {date_created}
          </Tag>
        )
      }
    },
    {
      title: "Purchases",
      key: "purchases",
      render: (target) => {
        return (
          <button onClick={(event) => nextPage(event, target.id)} className="bg-transparent border border-blue-500 text-blue-900 hover:bg-blue-200 rounded-sm py-1 px-4 text-white">
            Review
          </button>
        )
      }
    },
    {
      title: "Action",
      key: "action",
      render: (target) => {
        return (
          <Space size="middle" key="action">
            <Popconfirm onConfirm={(event) => isDelete(event, target.id)}
              title="Do you want to delete?"
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
  const currentData = arraySlice(target, current, dataShowed);

  return (
    <>
      <div className="max-w-content mx-auto px-4">
        <div className="mb-3">
          <div className="flex justify-between mb-3 md:mb-0">
            <h1 className="text-2xl font-semibold">Target Procurement</h1>
            <Input.Search
              allowClear
              className="w-full md:max-w-xs"
              placeholder="Search..."
              onSearch={(nameSearch) => {
                const sea = onSearch(nameSearch, target);
                setSearchFilter(sea);
              }}
            />
          </div>
        </div>
        <Divider />
        <div className="mt-3">
          <AdminTable
            searchFilter={searchFilter}
            columns={columns}
            currentData={currentData}
            DataArray={target}
            current={current}
            setCurrent={setCurrent}
            dataShowed={dataShowed}
          />
        </div>
      </div>
    </>
  );
}

export default withRouter(TargetProcurement)