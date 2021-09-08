import { useState, useContext, useEffect } from "react";
import { Tabs, Tag, Popconfirm, Table } from "antd";
import { TransactionHistory } from "../../components";
import {
  filteredTransaction,
  filtered,
  filteredDoneTransaction,
  filterTotal,
  sortTypes,
  sortRiceVariety,
} from "../../Utils/ReusableSyntax";
import { TransactionContext } from "../../Context/TransactionProvider";
import { RiceVarietyContext } from "../../Context/RiceVarietyProvider";
import { AuthContext } from "../../Context/auth";
import { app } from "../../config/firebase";
import RolesHooks from "../../lib/RolesHook";
import swal from "sweetalert";

const Transaction = () => {
  const [searchFilter, setSearchFilter] = useState(null);
  const [getVariety, setVariety] = useState(null);
  const [biddingReview, setBiddingReview] = useState(false);

  const context = useContext(AuthContext);
  const { transaction } = useContext(TransactionContext);
  const { fetchVariety } = useContext(RiceVarietyContext);
  const { TabPane } = Tabs;

  const filteredTransact = filteredTransaction(transaction, context);
  const TransactionDone = filteredDoneTransaction(transaction, context);
  const tradersTransaction = filtered(transaction, context);
  const TotalBid = filterTotal(TransactionDone);

  const { info } = RolesHooks();

  const onUpdateData = (id, owned) => {
    try {
      const document = app.firestore().collection("transaction").doc(id);

      document
        .update({
          biddingStatus: false,
          reviewStatus: false,
          owned: owned,
          status: "success",
        })
        .then(() => {
          swal({
            title: "Successfully",
            text: `Bidding Done`,
            icon: "success",
            button: "Ok",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onUpdateProduct = (productId, NumOfSocks) => {
    try {
      (async () => {
        const document = app.firestore().collection("product").doc(productId);

        const getValue = await document.get();

        if (getValue) {
          const newSocks = getValue.data().socks - NumOfSocks;

          console.log(newSocks)

          await document.update({
            socks: newSocks
          })
        }
      })()

      // document.update({
      //   socks : 
      // })
    } catch (error) {
      console.log(error.message);
    }
  }

  const onSubmit = async (event, id, riceVariety, productId, socks) => {
    event.preventDefault();

    console.log(productId, socks)

    try {
      const document = app
        .firestore()
        .collection("transaction")
        .where("riceVariety", "==", riceVariety);

      await document.get().then((querySnapshot) => {
        querySnapshot.docs.forEach((snapshot) => {
          const Review =
            snapshot.data().biddingStatus === true &&
            snapshot.data().reviewStatus === true;

          if (Review) {
            if (snapshot.id === id) {
              onUpdateData(id, "won", riceVariety);
              onUpdateProduct(productId, socks);
            } else {
              onUpdateData(snapshot.id, "lose", riceVariety);
            }
          } else {
            console.log("Already done");
          }
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };



  const filterTransactions = () => {
    const filter = filteredTransact.filter((obj) => {
      return obj.riceVariety === getVariety;
    });

    setSearchFilter(filter);
  };

  useEffect(filterTransactions, [getVariety]);

  useEffect(() => {
    const biddingReview = filteredTransact
      .filter((obj) => {
        return obj.riceVariety === getVariety && obj.biddingStatus === true;
      })
      .map((obj) => {
        return obj.biddingStatus;
      });

    setBiddingReview(biddingReview[0]);
  }, [getVariety]);

  //*Bidding Transaction
  const columns = [
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
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },
    {
      title: "Number of Socks",
      dataIndex: "socks",
      key: "socks",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (socks) => {
        return (
          <span>{socks} pieces</span>
        )
      }
    },

    {
      title: "Rice variety",
      dataIndex: "riceVariety",
      key: "riceVariety",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },
    {
      title: "Status",
      dataIndex: "biddingStatus",
      key: "biddingStatus",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (biddingStatus) => {
        return (
          <Tag
            color={biddingStatus ? "geekblue" : "volcano"}
            key={biddingStatus}
          >
            {biddingStatus ? "pending" : "Done"}
          </Tag>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (text) => {
        return <span>₱{text}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (transaction) => {
        return (
          <Popconfirm
            title="Would you like to continue?"
            onConfirm={(event) =>
              onSubmit(event, transaction.id, transaction.riceVariety, transaction.productId, transaction.socks)
            }
          >
            <button className="bg-transparent border border-blue-500 text-blue-900 hover:bg-blue-200 rounded-sm py-1 px-4 text-white">
              Accept
            </button>
          </Popconfirm>
        );
      },
    },
  ];

  //*Traders Transaction
  const transactionColumn = [
    {
      title: "Product Identification",
      dataIndex: "productId",
      key: "productId",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (text) => {
        return <span className="text-blue-500">{text}</span>;
      },
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },
    {
      title: "Socks",
      dataIndex: "socks",
      key: "socks",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },

    {
      title: "Rice variety",
      dataIndex: "riceVariety",
      key: "riceVariety",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
    },
    {
      title: "Bidding Status",
      dataIndex: "biddingStatus",
      key: "biddingStatus",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (biddingStatus) => {
        return (
          <Tag
            color={biddingStatus ? "geekblue" : "volcano"}
            key={biddingStatus}
          >
            {biddingStatus ? "In Progress" : "Finished"}
          </Tag>
        );
      },
    },
    {
      title: "Review Status",
      dataIndex: "reviewStatus",
      key: "reviewStatus",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (reviewStatus) => {
        return (
          <Tag color={reviewStatus ? "green" : "volcano"} key={reviewStatus}>
            {reviewStatus ? "In Progress" : "Finished"}
          </Tag>
        );
      },
    },
    {
      title: "Winner Status",
      dataIndex: "owned",
      key: "owned",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (owned) => {
        return (
          <Tag color={owned ? "green" : "volcano"} key={owned}>
            {owned === null
              ? "Pending"
              : owned === "won"
                ? "Won the Bet"
                : "Lost The Bet"}
          </Tag>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      setDirections: sortTypes,
      sorter: sortRiceVariety,
      render: (text) => {
        return <span>₱{text}</span>;
      },
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 bg-gray-100">
      <h1 className="text-2xl mb-4 font-semibold">
        {info.role === "Farmer"
          ? "Transaction Information"
          : "Transaction History"}
      </h1>
      <div className="text-right mb-4"></div>
      {info.role === "Farmer" ? (
        <Tabs defaultActiveKey={1}>
          <TabPane tab="Bidding Transaction" key={1}>
            <div className="flex justify-between">
              <div className="flex  gap-4">
                <label
                  htmlFor="getVariety"
                  className="block text-gray-700 text-lg font-semibold mt-1"
                >
                  Filtered By :{" "}
                </label>
                <select
                  id="getVariety"
                  name="getVariety"
                  className="w-72 mb-4 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={getVariety}
                  onChange={(event) => setVariety(event.target.value)}
                >
                  <option value=""></option>
                  {fetchVariety.map((variety) => (
                    <option value={variety.variety}>{variety.variety}</option>
                  ))}
                </select>
              </div>
            </div>
            {searchFilter != null && biddingReview ? (
              <Table
                className="overflow-auto"
                columns={columns}
                rowKey={(filteredTransact) => filteredTransact.id}
                dataSource={
                  searchFilter === null ? filteredTransact : searchFilter
                }
                pagination={false}
              />
            ) : (
              <div className="text-center">
                <h1 className="mt-6 text-gray-500 font-bold text-xl opacity-40">
                  No Bidding Data
                </h1>
              </div>
            )}
          </TabPane>
          <TabPane tab="Transaction History" key={2}>
            <TransactionHistory
              length={TransactionDone.length}
              Total={TotalBid}
              Transaction={TransactionDone}
              column={transactionColumn}
            />
          </TabPane>
        </Tabs>
      ) : (
        <div>
          <TransactionHistory
            length={tradersTransaction.length}
            Transaction={tradersTransaction}
            column={transactionColumn}
          />
        </div>
      )}
    </div>
  );
};

export default Transaction;
