//**return all pending items
export const pendingItems = (cartItems) => {
  return cartItems.filter((obj) => {
    return obj.itemStatus === "pending";
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
