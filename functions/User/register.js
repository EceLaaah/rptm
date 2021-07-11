const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const {
      imageUrl,
      firstname,
      lastname,
      role,
      gender,
      date,
      contact,
      barangay,
      municipality,
      province,
      email,
      password,
      uid,
    } = JSON.parse(event.body);

    const document = firebaseDb.collection("user").doc(uid);

    document.set({
      imageUrl,
      firstname,
      lastname,
      role,
      gender,
      date,
      contact,
      barangay,
      municipality,
      province,
      email,
      password,
    });

    return callback(200, "Successful Register");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
