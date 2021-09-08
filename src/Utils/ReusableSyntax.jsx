export const sortIncome = ["kilograms", "riceVariety", "farmerIncome", "productAge"];
export const types = ["Police", "Market", "Relief Operation"]

export const filterTransactionStatus = (transaction) => {
  return transaction.filter((obj) => {
    return obj.status === "success"
  })
}

export const monthDiff = (d1, d2) => {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

export const sortFarmerIncome = (product, sortType) => {
  const sortedData = product.sort((a, b) => {
    if (sortType === "farmerIncome" || sortType === "kilograms") {
      return a[sortTypes] - b[sortTypes];
    }
  });
  return sortedData;
};

//*Table Sorting
export const sortTypes = ["descend", "ascend"];
export const sortRiceVariety = (a, b) =>
  a.riceVariety < b.riceVariety ? 1 : -1;

// //**return all pending items
// export const pendingItems = (cartItems) => {
//   return cartItems.filter((obj) => {
//     return obj.itemStatus === "pending";
//   });
// };

//*Filter Transaction by Rice Variety
export const filterTransaction = (transaction, riceVariety) => {
  return transaction.filter((obj) => {
    return obj.riceVariety === riceVariety;
  });
};

//*Convert Array Object into Object
export const objectAssign = (ObjectArray, obj) => {
  return ObjectArray.map((info) => {
    return Object.assign(obj, info);
  });
};

//**filtered items according to user authentication */
export const filtered = (productItems, currentUseriId) => {
  return productItems.filter((obj) => {
    return obj.uid === currentUseriId.uid;
  });
};

//**filtered Farmer transaction by owners id and biddingStatus equal to true */
export const filteredTransaction = (transaction, currentUseriId) => {
  return transaction.filter((obj) => {
    return obj.farmerId === currentUseriId.uid && obj.biddingStatus === true;
  });
};

//**filtered Farmer transaction by owners id and BiddingStatus Equal to false */
export const filteredDoneTransaction = (transaction, currentUseriId) => {
  return transaction.filter((obj) => {
    return (
      obj.farmerId === currentUseriId.uid &&
      obj.biddingStatus === false &&
      obj.owned === "won" &&
      obj.status === "success"
    );
  });
};

//**filtered NFA transaction status is equal to pending */
export const filteredPendingTransaction = (transaction, currentUseriId) => {
  return transaction.filter((obj) => {
    return (
      obj.uid === currentUseriId.uid &&
      obj.status === "pending"
    );
  });
};

//* getData slice with by 5 on each row
export const arraySlice = (filteredProduct, current, dataShowed) => {
  const indexLastData = current * dataShowed;
  const indexOfFirstData = indexLastData - dataShowed;
  const currentData = filteredProduct.slice(indexOfFirstData, indexLastData);

  return currentData;
};

//**Returning match search value from server */
export const onSearch = (value, items) => {
  return items.filter((data) => {
    return Object.keys(data).some((key) => {
      return String(data[key]).toLowerCase().includes(value.toLowerCase());
    });
  });
};

export const filterTotal = (dataArray) => {
  const subTotal = dataArray.reduce((a, b) => a + b.price, 0);

  return subTotal;
};

// //* return numerica and alphabetical sorted data
// export const sortedIncome = (filterProduct, sortTypes) => {
//   const sortedData = filterProduct.sort((a, b) => {
//     return b[sortTypes] - a[sortTypes];
//   });
//   return sortedData;
// };