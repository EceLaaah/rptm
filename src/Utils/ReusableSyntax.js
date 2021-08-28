//*Table Sorting
export const sortTypes = ["descend", "ascend"];
export const sortRiceVariety = (a, b) =>
  a.riceVariety < b.riceVariety ? 1 : -1;

//**return all pending items
export const pendingItems = (cartItems) => {
  return cartItems.filter((obj) => {
    return obj.itemStatus === "pending";
  });
};

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

//**filtered transaction by owners id and biddingStatus equal to true */
export const filteredTransaction = (transaction, currentUseriId) => {
  return transaction.filter((obj) => {
    return obj.farmerId === currentUseriId.uid && obj.biddingStatus === true;
  });
};

//**filtered transaction by owners id and BiddingStatus Equal to false */
export const filteredDoneTransaction = (transaction, currentUseriId) => {
  return transaction.filter((obj) => {
    return (
      obj.farmerId === currentUseriId.uid &&
      obj.biddingStatus === false &&
      obj.owned === "won"
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
  const subTotal = dataArray.reduce((a, b) => a + b.biddingPrice, 0);

  return subTotal;
};
