const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { id, imageUrl } = JSON.parse(event.body);

    const document = firebaseDb.collection("user").doc(id);

    id &&
      document.update({
        imageUrl,
      });

    return callback(200, "Successfully Changed Profile");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
