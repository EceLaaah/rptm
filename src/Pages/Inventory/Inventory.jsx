import { useContext, useState } from 'react';
import { TransactionContext } from '../../Context/TransactionProvider'
import { AuthContext } from '../../Context/auth'
import {
  filteredByNFA,
  arraySlice,
  onSearch,
  monthDiff,
  filtered,
  sortTypes,
  sortRiceVariety,
} from "../../Utils/ReusableSyntax";
import { AdminTable, AddDistribution } from '../../components'
import { app } from '../../config/firebase'
import { Popconfirm, Input, Tag, Tabs, Table } from 'antd'
import swal from 'sweetalert';

export default function Inventory() {

  const { finishTransaction, riceMilled } = useContext(TransactionContext);
  const context = useContext(AuthContext);
  const dateToday = new Date();
  const { TabPane } = Tabs;

  const [searchFilter, setSearchFilter] = useState(null);
  const [searchMilled, setSearchMilled] = useState(null)
  const [open, setOpen] = useState({ open: false, data: {} });
  const [current, setCurrent] = useState(1);

  const filteredTransaction = filteredByNFA(finishTransaction, context);
  const filteredRiceMilled = filtered(riceMilled, context);

  const onMilled = async (event, data) => {
    try {
      event.preventDefault();
      //const dateHarvested = new Date(data.dateHarvested.seconds * 1000);
      //const palayAge = monthDiff(dateHarvested, dateToday);

      const document = app.firestore().collection("riceMilled").doc();

      // if (palayAge <= 5) {
      //   return swal({
      //     title: "Warning",
      //     text: `Palay is not yet 6 months old`,
      //     icon: "warning",
      //     button: "Ok",
      //   });
      // }

      return await document.set({
        procuredPalayId: data.id,
        dateMilled: dateToday,
        riceVariety: data.riceVariety,
        totalSocks: data.socks,
        email: data.userEmail,
        uid: data.uid,
        price: data.price,
        date_created: dateToday
      }).then(() => {
        palayisMilled(data.id)
        swal({
          title: "Success",
          text: `Successfully Milled`,
          icon: "success",
          button: "Ok",
        });
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const palayisMilled = (id) => {
    try {
      const document = app.firestore().collection("transaction").doc(id);

      document.update({
        isMilled: true,
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const onDistribute = (event, data) => {
    event.preventDefault();
    if (!open.open) {
      setOpen({ open: true, data: { ...data } });
    } else {
      setOpen({ open: false, data: {} });
    }
  }

  const procuredPalayColumn = [
    {
      title: "Unique Identification",
      dataIndex: "id",
      key: "id",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (text) => {
        return <span className="text-blue-500">{text}</span>;
      },
    },
    {
      title: "Palay Months",
      dataIndex: "productAge",
      key: "productAge",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (productAge) => {
        let color = productAge <= 5 && 'lime';

        if (productAge >= 6) {
          color = 'orange'
        }

        if (productAge >= 9) {
          color = 'red'
        }

        return (
          <Tag color={color}>
            <span>{productAge} Months</span>
          </Tag>
        )
      }
    },
    {
      title: "Rice Variety",
      dataIndex: "riceVariety",
      key: "riceVariety",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },
    {
      title: "Socks Purchased",
      dataIndex: "socks",
      key: "socks",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (socks) => {
        return <span className="bg-blue-400 py-1 px-2 font-bold rounded-full text-white">{socks}</span>
      }
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (total) => {
        return <span>{total.toLocaleString()}</span>
      }
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (date_created) => {
        return (
          <Tag color="geekblue">
            <span>{new Date(date_created.seconds * 1000).toISOString().substring(0, 10)}</span>
          </Tag>
        )
      }
    },
    {
      title: "Action",
      key: "action",
      render: (data) => {
        return (
          <Popconfirm
            title="Do you want to milled this rice?"
            onConfirm={(event) => onMilled(event, data)}
          >
            <button className="bg-transparent border border-blue-500 text-blue-900 hover:bg-blue-200 rounded-sm py-1 px-4 text-white">
              Milled
            </button>
          </Popconfirm>
        );
      },
    },
  ];


  //**Rice Milled */
  const riceMilledColumn = [
    {
      title: "Unique Identification",
      dataIndex: "id",
      key: "id",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (text) => {
        return <span className="text-blue-500">{text}</span>;
      },
    },
    {
      title: "Age of Rice Milled",
      dataIndex: "dateMilled",
      key: "dateMilled",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (dateMilled) => {
        const date = dateMilled !== undefined && new Date(dateMilled.seconds * 1000)

        const milledAge = monthDiff(date, dateToday);


        let color = milledAge <= 5 && 'lime';

        if (milledAge >= 6) {
          color = 'orange'
        }

        if (milledAge >= 9) {
          color = 'red'
        }

        return (
          <Tag color={color}>
            <span>{milledAge} old</span>
          </Tag>
        )
      }
    },
    {
      title: "Date of Rice Milled",
      dataIndex: "date_created",
      key: "date_created",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (date_created) => {
        return (
          <Tag color="geekblue">
            <span>{new Date(date_created.seconds * 1000).toISOString().substring(0, 10)}</span>
          </Tag>
        )
      }
    },
    {
      title: "Rice Variety",
      dataIndex: "riceVariety",
      key: "riceVariety",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },
    {
      title: "Total Socks",
      dataIndex: "totalSocks",
      key: "totalSocks",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (totalSocks) => {
        return (
          <span className="bg-blue-400 py-1 px-2 font-bold rounded-full text-white">{totalSocks && totalSocks.toLocaleString()}</span>
        )
      }
    },
    {
      title: "Action",
      key: "action",
      render: (data) => {
        return (
          <Popconfirm
            title="Do you want to milled this rice?"
            onConfirm={(event) => onDistribute(event, data)}
          >
            <button className="bg-transparent border border-blue-500 text-blue-900 hover:bg-blue-200 rounded-sm py-1 px-4 text-white">
              Distribute
            </button>
          </Popconfirm>
        );
      },
    },
  ];

  //** Data showed to the client
  const dataShowed = 5;
  const currentData = arraySlice(filteredTransaction, current, dataShowed);

  return (
    <>
      {open.open && (
        <AddDistribution isOpen={open.open} data={open.data} isClose={(event) => onDistribute(event)} />
      )}
      <div>
        {" "}
        <div className=" mb-4">
          <h1 className="text-2xl font-semibold">Palay Information</h1>
          <span className="text-gray-400">Palay that is bought from marketplace</span>
        </div>
        <Tabs defaultActiveKey={1}>
          <TabPane tab="Procured Palay" key={1}>
            <div className="mb-4 flex justify-end">
              <Input.Search
                allowClear
                className="w-full md:max-w-xs"
                placeholder="Search..."
                onSearch={(nameSearch) => {
                  const sea = onSearch(nameSearch, filteredTransaction);
                  setSearchFilter(sea);
                }}
              />
            </div>
            <div>
              <AdminTable
                searchFilter={searchFilter}
                columns={procuredPalayColumn}
                currentData={currentData}
                DataArray={filteredTransaction}
                current={current}
                setCurrent={setCurrent}
                dataShowed={dataShowed}
              />
            </div>
          </TabPane>
          <TabPane tab="Rice Milled" key={2}>
            <div className="mb-4 flex justify-end">
              <Input.Search
                allowClear
                className="w-full md:max-w-xs"
                placeholder="Search..."
                onSearch={(nameSearch) => {
                  const sea = onSearch(nameSearch, filteredRiceMilled);
                  setSearchMilled(sea);
                }}
              />
            </div>
            <div>
              <Table
                className="overflow-auto"
                columns={riceMilledColumn}
                rowKey={(filteredRiceMilled) => filteredRiceMilled.id}
                dataSource={searchMilled !== null ? searchMilled :
                  filteredRiceMilled
                }
                pagination={false}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
