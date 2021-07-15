const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

module.exports = async (event) => {
  try {
    const {
      imageUrl,
      firstname,
      lastname,
      role,
      gender,
      dateOfBirth,
      contact,
      barangay,
      municipality,
      province,
      email,
      password,
      uid,
    } = JSON.parse(event.body);

    const age = getAge(dateOfBirth);

    const document = firebaseDb.collection("user").doc(uid);

    document.set({
      imageUrl,
      firstname,
      lastname,
      role,
      gender,
      dateOfBirth,
      age,
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
