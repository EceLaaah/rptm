import React, { useCallback, useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import { app } from "../../config/firebase";
import { useDropzone } from "react-dropzone";
import { Textfield } from "../../components";
import { Trash } from "react-feather";
import swal from "sweetalert";

const information = {
  riceName: "",
  email: "",
  kilograms: "",
  price: "",
  quantity: 0,
  description: "",
};

const Post = () => {
  const context = useContext(AuthContext);
  const [myFile, setMyFile] = useState([]);
  const [
    { riceName, email, kilograms, price, quantity, description },
    setState,
  ] = useState(information);

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

  //*delete specific product item
  const handleDeleteFile = (file) => {
    const specific_file = [...file];
    specific_file.length > 0 && specific_file.splice(file, 1);
    setMyFile(specific_file);
  };

  //fetch file display as list
  const files = myFile.map((file) => {
    return (
      <li
        className="py-1 px-2 max-w-sm bg-blue-300 rounded mb-1"
        key={file.name}
      >
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">
            {file.name} - {file.size}
          </span>
          <button type="button" onClick={() => handleDeleteFile(myFile)}>
            <Trash size="22" color="#FFF" className="cursor-pointer" />
          </button>
        </div>
      </li>
    );
  });

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  //*remove file from state
  const removeFile = () => {
    if (myFile) {
      const newFiles = [...myFile];
      newFiles.splice(newFiles.indexOf(files), 1);
      setMyFile(newFiles);
    }
  };

  const clearState = () => {
    setState({ ...information });
    removeFile();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const qty = Number(quantity);
    const productPrice = Number(price);

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
                uid: context.uid,
                riceName: riceName,
                email: email,
                kilograms: kilograms,
                price: productPrice,
                quantity: qty,
                description: description,
                imageUrl: imageUrl,
              })
              .then(() => {
                swal({
                  title: "Success",
                  text: `Successfully Inserted`,
                  icon: "success",
                  button: "Ok",
                }).then(() => {
                  clearState();
                });
              });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-5xl bg-white rounded-lg mx-auto w-full shadow-lg p-6">
      <h1 className="text-2xl font-bold">Post Bidding</h1>

      <section className="flex justify-center gap-4">
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
          <div className="grid grid-cols-3 gap-4">
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
            <Textfield
              value={quantity}
              onChange={(event) => onChange(event)}
              label="Quantity"
              type="number"
              placeholder="Quantity"
              name="quantity"
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
      </section>
      <div className="flex items-center justify-end gap-4 mt-6">
        <button
          onClick={() => clearState()}
          className="w-24 h-8 border border-primary bg-gray-100 hover:bg-gray-200 text-black text-sm rounded-sm focus:outline-none focus:shadow-outline "
        >
          Cancel
        </button>
        <button
          onClick={(event) => onSubmit(event)}
          className="w-24 h-8 bg-primary hover:bg-primary-slight text-white text-sm font-semibold rounded-sm focus:outline-none focus:shadow-outline "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Post;
