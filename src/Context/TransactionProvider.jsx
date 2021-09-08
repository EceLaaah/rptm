import { createContext, useState, useEffect } from "react";
import { app } from "../config/firebase";

const TransactionContext = createContext();

const TranscationProvider = ({ children }) => {
  const [transaction, setTransaction] = useState([]);
  const [finishTransaction, setFinishTransaction] = useState([]);

  const fetchTransaction = () => {
    const document = app.firestore().collection("transaction");
    return document.onSnapshot((snapshot) => {
      const transactionArray = [];

      snapshot.forEach((transactionData) => {
        transactionArray.push({
          ...transactionData.data(),
          id: transactionData.id,
        });
        setTransaction(transactionArray);
      });
    });
  };

  useEffect(fetchTransaction, []);

  const fetchDoneBidding = () => {
    const document = app.firestore().collection("transaction").where("biddingStatus", "==", false)
    return document.onSnapshot((snapshot) => {
      const transactionArray = [];

      snapshot.forEach((transactionData) => {
        transactionArray.push({
          ...transactionData.data(),
          id: transactionData.id,
        });
      });
      setFinishTransaction(transactionArray);
    });
  }

  useEffect(fetchDoneBidding, [])

  return (
    <TransactionContext.Provider
      value={{ transaction, finishTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionContext, TranscationProvider };
