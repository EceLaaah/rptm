const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const {
      riceName,
      email,
      kilograms,
      price,
      dateHarvested,
      description,
      id,
    } = JSON.parse(event.body);

    const document = firebaseDb.collection("product").doc(id);

    await document.update({
      riceName,
      email,
      kilograms,
      price,
      dateHarvested,
      description,
    });

    return callback(200, "Successfully updated");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
