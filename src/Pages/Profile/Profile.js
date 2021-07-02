import React, { useContext, useEffect, useState } from "react";
import { UpdateTextField } from "../../components";
import { app } from "../../config/firebase";
import swal from "sweetalert";
import { AuthContext } from "../../Context/auth";

//*Convert Array Object into Object
const objectAssign = (ObjectArray, obj) => {
  return ObjectArray.map((info) => {
    return Object.assign(obj, info);
  });
};

const userInformation = {
  firstname: "",
  lastname: "",
  email: "",
  gender: "",
  date: "",
  contact: "",
  barangay: "",
  municipality: "",
  province: "",
};

const Profile = () => {
  const [
    {
      firstname,
      lastname,
      email,
      gender,
      date,
      contact,
      barangay,
      municipality,
      province,
    },
    setState,
  ] = useState(userInformation);
  const [information, setInformation] = useState([]);
  const profileInformation = useContext(AuthContext);

  information && objectAssign(information, userInformation);

  console.log(userInformation);

  //*Returning input value on listen
  const inputListener = (prevState, name, value) => {
    return { ...prevState, [name]: value };
  };

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => inputListener(prevState, name, value));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const document = app
      .firestore()
      .collection("user")
      .doc(profileInformation.uid);

    await document
      .update({
        firstname,
        lastname,
        email,
        gender,
        date,
        contact,
        barangay,
        municipality,
        province,
      })
      .then(async () => {
        await app
          .auth()
          .currentUser.updateEmail(email)
          .then(() => {
            swal({
              title: "Success",
              text: `Successfully updated`,
              icon: "success",
              button: "Ok",
            });
          });
      });
  };

  useEffect(() => {
    const array = [];
    const document = app
      .firestore()
      .collection("user")
      .doc(profileInformation.uid);

    document.get().then((doc) => {
      if (doc.exists) {
        array.push(doc.data());
        setInformation(array);
      }
    });
  }, [profileInformation.uid]);

  return (
    <div className="max-w-5xl mx-auto w-full shadow-lg bg-white rounded-sm p-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={firstname}
            label="First Name"
            type="text"
            placeholder="First Name"
            name="firstname"
          />
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={lastname}
            label="Last Name"
            type="text"
            placeholder="Last Name"
            name="lastname"
          />
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={email}
            label="Email"
            type="email"
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={gender}
            label="Gender"
            type="text"
            placeholder="Gender"
            name="gender"
          />
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={date}
            label="Date of Birth"
            type="date"
            placeholder="Date"
            name="date"
          />
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={contact}
            label="Contact"
            type="number"
            placeholder="Contact Number"
            name="contact"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={barangay}
            label="Barangay"
            type="text"
            placeholder="Barangay"
            name="barangay"
          />
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={municipality}
            label="Municipality"
            type="text"
            placeholder="Municipality"
            name="municipality"
          />
          <UpdateTextField
            onChange={(event) => onChange(event)}
            defaultValue={province}
            label="Province"
            type="text"
            placeholder="Province"
            name="province"
          />
        </div>
        <div className="w-full mt-4 mb-2 text-right">
          <button
            onClick={(event) => onSubmit(event)}
            type="submit"
            className="w-32 bg-primary hover:bg-primary-slight text-white text-sm py-2 px-4 font-semibold rounded-sm focus:outline-none focus:shadow-outline h-10"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
