const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const {
      firstname,
      lastname,
      email,
      monthlyIncome,
      gender,
      dateOfBirth,
      contact,
      barangay,
      municipality,
      province,
      id,
    } = JSON.parse(event.body);

    const document = firebaseDb.collection("user").doc(id);

    const income = Number(monthlyIncome);

    await document.update({
      firstname,
      lastname,
      email,
      monthlyIncome: income,
      gender,
      dateOfBirth,
      contact,
      barangay,
      municipality,
      province,
    });
    return callback(200, "Successful Register");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};