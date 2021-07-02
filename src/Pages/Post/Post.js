import React, { useCallback, useState } from "react";
import { app } from "../../config/firebase";
import { useDropzone } from "react-dropzone";
import { Textfield } from "../../components";
import swal from "sweetalert";

const information = {
  riceName: "",
  email: "",
  kilograms: "",
  price: "",
  description: "",
};

const Post = () => {
  const [myFile, setMyFile] = useState([]);
  const [{ riceName, email, kilograms, price, description }, setState] =
    useState(information);

  //put file in a state so that we have access to remove it
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (myFile.length > 0) {
        console.log("Invalid");
      } else {
        setMyFile([...myFile, ...acceptedFiles]);
      }
    },
    [myFile]
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ accept: "image/jpeg, image/png", onDrop });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    acceptedFiles.map(async (file) => {
      if (file) {
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(`Product/${file.name}`);
        await fileRef.put(file);
        await fileRef.getDownloadURL().then((imageUrl) => {
          if (imageUrl) {
            app
              .firestore()
              .collection("product")
              .add({
                riceName: riceName,
                email: email,
                kilograms: kilograms,
                price: price,
                description: description,
                imageUrl: imageUrl,
              })
              .then(() => {
                swal({
                  title: "Success",
                  text: `Successfully Inserted`,
                  icon: "success",
                  button: "Ok",
                });
              });
          }
        });
      }
    });
    // console.log({
    //   riceName,
    //   email,
    //   kilograms,
    //   price,
    //   description,
    //   myFile,
    // });
  };

  return (
    <div className="max-w-5xl bg-white rounded-lg mx-auto w-full shadow-lg p-6">
      <h1 className="text-2xl font-bold">Post Bidding</h1>

      <section className="flex justify-center gap-4">
        <div className="w-1/2">
          <div className="mt-6">
            <div {...getRootProps({ className: "dropzone" })}>
              <div className="flex items-center justify-center bg-gray-100 py-44 border-dashed border-4 cursor-pointer">
                <input {...getInputProps()} />
                {!isDragActive && (
                  <p className="text-center text-gray-400">
                    Drag 'n' drop some image here, or click to select files
                  </p>
                )}
              </div>
              <div className="mt-3">
                {isDragAccept && (
                  <p className="text-center py-1 bg-green-500 rounded text-white">
                    You got it right brotho
                  </p>
                )}
                {isDragReject && (
                  <p className="text-center py-1 bg-red-500 rounded text-white">
                    This image is not allowed
                  </p>
                )}
              </div>
            </div>
            <aside className="mt-2">
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </div>
        </div>
        <div className="w-1/2">
          <div className="grid grid-cols-2 gap-4">
            <Textfield
              value={riceName}
              onChange={(event) => onChange(event)}
              label="Rice Name"
              type="text"
              placeholder="Rice Name"
              name="riceName"
            />
            <Textfield
              value={email}
              onChange={(event) => onChange(event)}
              label="Owner Email"
              type="email"
              placeholder="Owner Email"
              name="email"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Textfield
              value={kilograms}
              onChange={(event) => onChange(event)}
              label="Kilograms"
              type="text"
              placeholder="Kilograms"
              name="kilograms"
            />
            <Textfield
              value={price}
              onChange={(event) => onChange(event)}
              label="Price"
              type="number"
              placeholder="Price"
              name="price"
            />
          </div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(event) => onChange(event)}
            id="description"
            required
            name="description"
            placeholder="Description..."
            className="w-full border rounded px-2 py-1 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            cols={30}
            rows={7}
          />
        </div>
      </section>
      <div className="flex items-center justify-end gap-4">
        <button className="w-32 border border-primary bg-gray-100 hover:bg-gray-200 text-black text-lg rounded-sm focus:outline-none focus:shadow-outline h-10">
          Cancel
        </button>
        <button
          onClick={(event) => onSubmit(event)}
          className="w-32 bg-primary hover:bg-primary-slight text-white text-lg font-semibold rounded-sm focus:outline-none focus:shadow-outline h-10"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Post;
