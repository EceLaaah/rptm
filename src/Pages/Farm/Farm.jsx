import { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import { FarmLocationContext } from "../../Context/FarmLocationProvider";
import { Tag, Space, Popconfirm, Divider, Spin, Input } from "antd";
import { Edit3, Trash2, PlusCircle } from "react-feather";
import { MyModal, Textfield, AdminTable } from "../../components";
import { MyDateString } from "../../Utils";
import { arraySlice, onSearch } from "../../Utils/ReusableSyntax";
import httpRequest from "../../api/httpRequest";
import swal from "sweetalert";

export default function Farm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState(null);
  const [current, setCurrent] = useState(1);
  const [farmLocation, setFarmLocation] = useState("");
  const [landSize, setLandSize] = useState("");
  const { fetchFarmLocation } = useContext(FarmLocationContext);
  const context = useContext(AuthContext);
  // const today = new Date();
  // const dateToday = `${
  //   Months[today.getMonth()]
  // } ${today.getDate()}, ${today.getFullYear()}`;

  const isToggle = (event) => {
    event.preventDefault();
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const onDelete = (event, id) => {
    event.preventDefault();

    console.log(id);
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
      title: "Farm Location",
      dataIndex: "farmLocation",
      key: "farmLocation",
    },
    {
      title: "Land Size",
      dataIndex: "landSize",
      key: "landSize",
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      render: (date_created) => {
        return (
          <Tag color="geekblue" key={date_created}>
            {date_created}
          </Tag>
        );
      },
    },
    {
      title: "Date Updated",
      dataIndex: "date_updated",
      key: "date_updated",
      render: (date_updated) => {
        return (
          <Tag color="volcano" key={date_updated}>
            {date_updated}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (fetchVariety) => {
        return (
          <Space size="middle" key="action">
            <Popconfirm title="would you like to continue?">
              <Edit3
                className="text-blue-700 cursor-pointer"
                size="20"
                id="update"
              />
            </Popconfirm>
            <Popconfirm
              onConfirm={(event) => onDelete(event, fetchVariety.id)}
              title="Do you want to delete?"
            >
              <Trash2 className="text-red-700 cursor-pointer" size="20" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const Loading = () => setLoading(true);

  const onSubmit = (event) => {
    event.preventDefault();

    Loading();

    httpRequest
      .post(
        "/.netlify/functions/index?name=farmLocation&&component=userInformationComponent",
        {
          uid: context.uid,
          farmLocation,
          landSize,
          date_created: MyDateString,
        }
      )
      .then(() => {
        setLoading(false);
        setOpen(false);
        setFarmLocation("");
        setLandSize("");
        swal({
          title: "Success",
          text: `Successfully Added`,
          icon: "success",
          button: "Ok",
        });
      });
  };

  //** Data showed to the client
  const dataShowed = 5;
  const currentData = arraySlice(fetchFarmLocation, current, dataShowed);

  return (
    <>
      <MyModal
        className="max-w-sm w-full h-full md:h-80 mx-auto p-6"
        isOpen={open}
      >
        <div className="max-w-2xl mx-auto">
          <Spin spinning={loading}>
            <h1 className="text-lg text-primary font-semibold text-center mt-2">
              Farm Location
            </h1>
            <Textfield
              value={farmLocation}
              name={farmLocation}
              onChange={(event) => setFarmLocation(event.target.value)}
              placeholder="Farm Location"
            />
            <Textfield
              value={landSize}
              name={landSize}
              onChange={(event) => setLandSize(event.target.value)}
              placeholder="Land Size"
            />
            <Divider />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={(event) => isToggle(event)}
                className="px-6 py-1 border border-primary bg-gray-100 hover:bg-gray-200 text-black text-sm rounded-sm focus:outline-none focus:shadow-outline "
              >
                Cancel
              </button>
              <button
                onClick={(event) => onSubmit(event)}
                className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm"
              >
                Save
              </button>
            </div>
          </Spin>
        </div>
      </MyModal>
      <div className="max-w-content mx-auto px-4 bg-gray-100">
        <div className="md:flex items-center justify-between">
          <div className="flex justify-end mb-3 md:mb-0">
            <button
              onClick={(event) => isToggle(event)}
              type="button"
              id="add"
              className="flex items-center gap-2 py-1 px-5 bg-primary hover:bg-primary-slight text-white font-semibold rounded-sm shadow-lg"
            >
              <PlusCircle size="20" />
              Farm Location
            </button>
          </div>
          <Input.Search
            allowClear
            className="w-full md:max-w-xs"
            placeholder="Search by firstname"
            onSearch={(nameSearch) => {
              const sea = onSearch(nameSearch, fetchFarmLocation);
              setSearchFilter(sea);
            }}
          />
        </div>
        <div className="mt-4">
          <AdminTable
            searchFilter={searchFilter}
            columns={columns}
            currentData={currentData}
            DataArray={fetchFarmLocation}
            current={current}
            setCurrent={setCurrent}
            dataShowed={dataShowed}
          />
        </div>
      </div>
    </>
  );
}