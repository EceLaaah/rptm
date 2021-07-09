const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const {
      uid,
      riceName,
      email,
      kilograms,
      price,
      quantity,
      description,
      imageUrl,
    } = JSON.parse(event.body);

    const document = firebaseDb.collection("product");

    document.add({
      uid: uid,
      riceName: riceName,
      email: email,
      kilograms: kilograms,
      price: price,
      quantity: quantity,
      description: description,
      imageUrl: imageUrl,
    });

    return callback(200, "Successfully Inserted");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
