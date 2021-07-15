const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { uid, variety, date_created } = JSON.parse(event.body);

    const document = firebaseDb.collection("variety").doc();

    await document.set({
      uid,
      variety,
      date_created,
    });

    return callback(200, "Successfully added");
  } catch (error) {
    console.log(error);
    return callback(405, {});
  }
};
