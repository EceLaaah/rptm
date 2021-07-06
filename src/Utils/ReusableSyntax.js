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
