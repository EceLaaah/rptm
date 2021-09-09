import { useState, useContext } from "react";
import {
  AdminTable,
  AddDistribution,
  UpdateDistribution,
} from "../../components";
import { Space, Popconfirm, Input, Divider } from "antd";
import { arraySlice, onSearch } from "../../Utils/ReusableSyntax";
import { Edit3, Trash2, PlusCircle } from "react-feather";
import { app } from "../../config/firebase";
import { DistributionContext } from "../../Context/DistributionProvider";
import swal from 'sweetalert'

const typeName = {
  MARKET: "Market",
  POLICE: "Police",
  RELIEF: "Relief Operation"
}

const collectionName = {
  MARKET: "marketDistribution",
  POLICE: "policeDistribution",
  RELIEF: "reliefDistribution"
}

export default function Distribution() {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpnUpdate] = useState(false);
  const [id, setId] = useState("");
  const [searchFilter, setSearchFilter] = useState(null);
  const [current, setCurrent] = useState(1);

  const { distribution } = useContext(DistributionContext);

  // const deleteProcure = (event, id) => {
  //   event.preventDefault();
  //   const document = app.firestore().collection("procurement").doc(id);
  //   id && document.delete();
  // };

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
    setId(id);
    if (!openUpdate) {
      setOpnUpdate(true);
    } else {
      setOpnUpdate(false);
    }
  };

  const deleteProcure = async (event, id) => {
    event.preventDefault();
    const documentDistribution = app.firestore().collection("distribution").doc(id);
    const documentTypes = app.firestore();

    const getDistributionType = await documentDistribution.get();

    id && documentDistribution.delete().then(() => {
      swal({
        title: "Successfully Deleted",
        text: `Click Ok to proceed`,
        icon: "success",
        button: "Ok",
      });
    });

    if (getDistributionType.data().distributionType === typeName.MARKET) {
      return documentTypes.collection(collectionName.MARKET).doc(getDistributionType.data().distributionTypeId).delete();
    }

    if (getDistributionType.data().distributionType === typeName.POLICE) {
      return documentTypes.collection(collectionName.POLICE).doc(getDistributionType.data().distributionTypeId).delete();
    }

    if (getDistributionType.data().distributionType === typeName.RELIEF) {
      return documentTypes.collection(collectionName.RELIEF).doc(getDistributionType.data().distributionTypeId).delete();
    }

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
      title: "Distribution Type",
      dataIndex: "distributionType",
      key: "distributionType",
    },
    {
      title: "Distribution Date",
      dataIndex: "distributionDate",
      key: "distributionDate",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Barangay",
      dataIndex: "barangay",
      key: "barangay",
    },
    {
      title: "Municipality",
      dataIndex: "municipality",
      key: "municipality",
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "Action",
      key: "action",
      render: (distribution) => {
        return (
          <Space size="middle" key="action">
            <Popconfirm
              title="would you like to continue?"
              onConfirm={(event) => isUpdateToggle(event, distribution.id)}
            >
              <Edit3
                className="text-blue-700 cursor-pointer"
                size="20"
                id="update"
              />
            </Popconfirm>
            <Popconfirm
              title="Do you want to delete?"
              onConfirm={(event) => deleteProcure(event, distribution.id)}
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
  const currentData = arraySlice(distribution, current, dataShowed);

  return (
    <>
      {open && (
        <AddDistribution isOpen={open} isClose={(event) => isToggle(event)} />
      )}
      {openUpdate && (
        <UpdateDistribution
          isOpen={openUpdate}
          isClose={(event) => isUpdateToggle(event)}
          id={id}
        />
      )}
      <div className="max-w-content mx-auto bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Distribution</h1>
        <div className="mb-4">
          <div className="flex justify-between mb-3 md:mb-0">
            <button
              onClick={(event) => isToggle(event)}
              type="button"
              id="add"
              className="flex items-center gap-2 py-1 px-5 bg-primary hover:bg-primary-slight text-white font-semibold rounded-sm shadow-lg"
            >
              <PlusCircle size="20" />
              Add Distribution
            </button>
            <Input.Search
              allowClear
              className="w-full md:max-w-xs"
              placeholder="Search..."
              onSearch={(nameSearch) => {
                const sea = onSearch(nameSearch, distribution);
                setSearchFilter(sea);
              }}
            />
          </div>
        </div>
        <Divider />
        <AdminTable
          searchFilter={searchFilter}
          columns={columns}
          currentData={currentData}
          DataArray={distribution}
          current={current}
          setCurrent={setCurrent}
          dataShowed={dataShowed}
        />
      </div>
    </>
  );
}
