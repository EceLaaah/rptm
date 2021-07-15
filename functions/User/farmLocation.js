const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { uid, farmLocation, landSize, date_created } = JSON.parse(
      event.body
    );

    const documents = firebaseDb.collection("farmLocation");

    await documents.add({
      uid,
      farmLocation,
      landSize,
      date_created,
    });

    return callback(200, "Successfully Added");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
