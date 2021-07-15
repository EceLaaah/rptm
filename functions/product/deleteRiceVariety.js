const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { id } = JSON.parse(event.body);

    // const document = firebaseDb.collection("variety").doc(id);

    // id && document.delete();
    console.log(id);

    return callback(200, "Successfully deleted");
  } catch (error) {
    console.log(error);
    return callback(405, {});
  }
};
