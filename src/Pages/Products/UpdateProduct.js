import React, { useState, useEffect } from "react";
import { objectAssign } from "../../Utils/ReusableSyntax";
import { app } from "../../config/firebase";
import { Textfield, Card } from "../../components";
import { Spin, Popconfirm } from "antd";
import httpRequest from "../../api/httpRequest";
import swal from "sweetalert";

const information = {
  riceVariety: "",
  email: "",
  kilograms: "",
  price: "",
  dateHarvested: "",
  description: "",
};

const UpdateProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");

  const [
    { riceVariety, email, kilograms, price, dateHarvested, description },
    setState,
  ] = useState(information);
  const [productInformation, setProductInformation] = useState([]);

  productInformation && objectAssign(productInformation, information);

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const document = app.firestore().collection("product").doc(id);
    return document.onSnapshot((snapshot) => {
      const items_array = [];
      if (snapshot) {
        items_array.push({ ...snapshot.data() });
        setProductInformation(items_array);
      }
    });
  }, [id]);

  const Loading = () => setLoading(true);

  const onSubmit = async (event) => {
    event.preventDefault();
    const productPrice = Number(price);

    Loading();

    // const config = {
    //   riceName,
    //   email,
    //   kilograms,
    //   price: productPrice,
    //   dateHarvested,
    //   description,
    //   id,
    // };

    const document = app.firestore().collection("product").doc(id);

    document
      .update({
        riceVariety,
        email,
        kilograms,
        price: productPrice,
        dateHarvested,
        description,
        id,
      })
      .then(() => {
        setLoading(false);
        swal({
          title: "Success",
          text: `Successfully updated`,
          icon: "success",
          button: "Ok",
        });
      });

    // httpRequest
    //   .put(
    //     "/.netlify/functions/index?name=updateProduct&&component=productComponent",
    //     config
    //   )
    //   .then(() => {
    // setLoading(false);
    // swal({
    //   title: "Success",
    //   text: `Successfully updated`,
    //   icon: "success",
    //   button: "Ok",
    // });
    //   });
  };

  return (
    <Spin spinning={loading}>
      <div className="max-w-5xl bg-white rounded-lg mx-auto w-full shadow-lg p-6">
        <h1 className="text-2xl font-bold">Update Product</h1>
        <section className="flex md:flex-row flex-col justify-center gap-4">
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Textfield
                value={riceVariety}
                onChange={(event) => onChange(event)}
                label="Rice Variety"
                type="text"
                placeholder="Rice Variety"
                name="riceVariety"
              />
              <Textfield
                readOnly={true}
                value={email}
                onChange={(event) => onChange(event)}
                label="Owner Email"
                type="email"
                placeholder="Owner Email"
                name="email"
              />
              <Textfield
                onChange={(event) => onChange(event)}
                value={dateHarvested}
                label="Date Harvested"
                type="date"
                placeholder="Date Harvested"
                name="dateHarvested"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="w-full md:w-1/2 flex justify-center">
            {productInformation.map((type, index) => (
              <Card
                key={index}
                image={type.imageUrl}
                kilograms={type.kilograms}
                price={type.price}
                title={type.riceVariety}
                name={type.email}
                description={type.description}
              />
            ))}
          </div>
        </section>
        <div className="flex items-center justify-end gap-4 mt-6">
          <Popconfirm
            title="Are you sure to edit this product?"
            onConfirm={(event) => onSubmit(event)}
          >
            <button className="w-24 h-8 bg-primary hover:bg-primary-slight text-white text-sm font-semibold rounded-sm focus:outline-none focus:shadow-outline ">
              Save
            </button>
          </Popconfirm>
        </div>
      </div>
    </Spin>
  );
};

export default UpdateProduct;
