import React, { useContext, useEffect, useState } from "react";
import { Divider, Popover } from "antd";
import { objectAssign } from "../../Utils/ReusableSyntax";
import { UpdateTextField } from "../../components";
import { app } from "../../config/firebase";
import { AuthContext } from "../../Context/auth";
import { Spin } from "antd";
import httpRequest from "../../api/httpRequest";
import swal from "sweetalert";

const userInformation = {
  imageUrl: "",
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
      imageUrl,
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
  const [visible, setVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [profile, setProfilePicture] = useState({ status: false, image: null });
  const [information, setInformation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const profileInformation = useContext(AuthContext);

  information && objectAssign(information, userInformation);

  const imageOnchange = (event) => {
    const imageSelected = event.target.files[0];

    const ALLOWED_TYPES = ["image/jpeg", "image/jpg"];

    if (imageSelected && ALLOWED_TYPES.includes(imageSelected.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      setProfilePicture({ status: true, image: imageSelected });
      reader.readAsDataURL(imageSelected);
    } else {
      swal({
        title: "Warning",
        text: `Invalid file type`,
        icon: "warning",
        button: "Ok",
      });
    }
  };

  //*Remove selected image
  const onRemoveProfile = () => {
    if (profile.status) {
      setImagePreview(null);
      setProfilePicture({ status: false, image: null });
      setVisible(false);
    }
  };

  const isToggleProfile = (event) => {
    event.preventDefault();
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const isToggle = (event) => {
    event.preventDefault();
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  //*Returning input value on listen
  const inputListener = (prevState, name, value) => {
    return { ...prevState, [name]: value };
  };

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => inputListener(prevState, name, value));
  };

  const Loading = () => setLoading(true);

  const onSubmit = async (event) => {
    event.preventDefault();

    Loading();

    const config = {
      firstname,
      lastname,
      email,
      gender,
      date,
      contact,
      barangay,
      municipality,
      province,
      id: profileInformation.uid,
    };

    httpRequest
      .put(
        "/.netlify/functions/index?name=updateUserInformation&&component=userInformationComponent",
        config
      )
      .then(() => {
        setLoading(false);
        swal({
          title: "Success",
          text: `Successfully updated`,
          icon: "success",
          button: "Ok",
        });
      });
  };

  //*save image to firebase storage
  const updateProfile = async (event) => {
    event.preventDefault();
    Loading();

    if (profile.status) {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(`UserProfile/${profile.image.name}`);
      await fileRef.put(profile.image);

      fileRef.getDownloadURL().then((imageUrl) => {
        httpApi(imageUrl);
      });
    }
  };

  const httpApi = (imageUrl) => {
    try {
      httpRequest
        .put(
          "/.netlify/functions/index?name=updateUserProfile&&component=userInformationComponent",
          { id: profileInformation.uid, imageUrl }
        )
        .then(() => {
          setLoading(false);
          onRemoveProfile();
          swal({
            title: "Success",
            text: `Successfully Profile Updated`,
            icon: "success",
            button: "Ok",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
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

  const PopoverContent = () => {
    return (
      <div className="flex flex-col text-left">
        <label className="cursor-pointer">
          <input
            type="file"
            size={60}
            className="bg-blue-500 py-1 px-4"
            style={{ display: "none" }}
            onChange={(event) => imageOnchange(event)}
          />
          Change Profile
        </label>
        {imagePreview !== null && (
          <label className="mt-1 cursor-pointer" onClick={onRemoveProfile}>
            Cancel Photo
          </label>
        )}
      </div>
    );
  };

  return (
    <Spin spinning={loading}>
      <div className="max-w-5xl mx-auto w-full shadow-lg bg-white rounded-sm p-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <form>
          <section className="md:flex md:justify-center md:gap-9 pt-8">
            <div className="md:w-2/6 flex items-center flex-col">
              {imagePreview !== null ? (
                <>
                  <Popover
                    visible={visible}
                    content={PopoverContent}
                    title="Settings"
                  >
                    <div
                      onClick={(event) => isToggleProfile(event)}
                      className="w-40 h-40 object-cover rounded-full cursor-pointer border-solid border-4"
                      style={{
                        background: `url("${imagePreview}") no-repeat center/cover`,
                      }}
                    />
                  </Popover>
                  <span
                    onClick={(event) => updateProfile(event)}
                    className="font-semibold text-red-500 mt-2 cursor-pointer"
                  >
                    Change Profile
                  </span>
                </>
              ) : imageUrl ? (
                <Popover
                  visible={visible}
                  content={PopoverContent}
                  title="Settings"
                >
                  <img
                    onClick={(event) => isToggleProfile(event)}
                    src={imageUrl}
                    className="w-40 h-40  object-cover rounded-full cursor-pointer border-solid border-4"
                    alt="profile"
                  />
                </Popover>
              ) : (
                <Popover
                  visible={visible}
                  content={PopoverContent}
                  title="Settings"
                >
                  <img
                    onClick={(event) => isToggleProfile(event)}
                    src="/image/profile-test.jpg"
                    className="w-40 h-40 object-cover bg-no-repeat rounded-full cursor-pointer border-solid border-4"
                    alt="profile"
                  />
                </Popover>
              )}
              <div className="text-center mt-2">
                <span className="font-bold text-lg">{`${firstname} ${lastname}`}</span>
                <span className="text-sm block mb-2">{email}</span>
                {toggle ? (
                  <div>
                    <UpdateTextField
                      onChange={(event) => onChange(event)}
                      defaultValue={firstname}
                      type="text"
                      placeholder="First Name"
                      name="firstname"
                    />
                    <UpdateTextField
                      onChange={(event) => onChange(event)}
                      defaultValue={lastname}
                      type="text"
                      placeholder="Last Name"
                      name="lastname"
                    />
                    <div className="text-right mt-2">
                      <button
                        onClick={(event) => isToggle(event)}
                        className="px-3 py-1 mr-2 border border-primary bg-gray-100 hover:bg-gray-200 text-black text-sm rounded-sm focus:outline-none focus:shadow-outline "
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={(event) => onSubmit(event)}
                        className="bg-primary hover:bg-primary-slight text-white px-5 py-1 text-sm my-3 font-semibold rounded-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={(event) => isToggle(event)}
                    className="bg-transparent border border-gray-200 rounded-lg w-96 md:w-52 mb-6 md:my-0 py-1"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            <div className="w-full">
              <h1 className="text-2xl font-bold text-gray-400">
                User Information
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
                <UpdateTextField
                  className="mb-1 sm:mb-4 mt-1 sm:mt-6"
                  onChange={(event) => onChange(event)}
                  defaultValue={gender}
                  label="Gender"
                  type="text"
                  placeholder="Gender"
                  name="gender"
                />
                <UpdateTextField
                  className="mb-1 sm:mb-4 mt-1 sm:mt-6"
                  onChange={(event) => onChange(event)}
                  defaultValue={date}
                  label="Date of Birth"
                  type="date"
                  placeholder="Date"
                  name="date"
                />
                <UpdateTextField
                  className="mb-1 sm:mb-4 mt-1 sm:mt-6"
                  onChange={(event) => onChange(event)}
                  defaultValue={contact}
                  label="Contact"
                  type="number"
                  placeholder="Contact Number"
                  name="contact"
                />
              </div>
              <div className="w-full md:w-56">
                <UpdateTextField
                  label="Email"
                  onChange={(event) => onChange(event)}
                  defaultValue={email}
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <Divider />
              <h1 className="text-2xl font-bold text-gray-400">
                Personal Information
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
                <UpdateTextField
                  className="mb-1 sm:mb-4 mt-1 sm:mt-6"
                  onChange={(event) => onChange(event)}
                  defaultValue={barangay}
                  label="Barangay"
                  type="text"
                  placeholder="Barangay"
                  name="barangay"
                />
                <UpdateTextField
                  className="mb-1 sm:mb-4 mt-1 sm:mt-6"
                  onChange={(event) => onChange(event)}
                  defaultValue={municipality}
                  label="Municipality"
                  type="text"
                  placeholder="Municipality"
                  name="municipality"
                />
                <UpdateTextField
                  className="mb-1 sm:mb-4 mt-1 sm:mt-6"
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
                  className="w-24 h-8 bg-primary hover:bg-primary-slight text-white text-sm font-semibold rounded-sm focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Spin>
  );
};

export default Profile;
