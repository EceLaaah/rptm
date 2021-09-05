import { useState, useEffect, useContext } from "react";
import { MyModal } from "../";
import { Card } from "../";
import { app } from "../../config/firebase";
import swal from "sweetalert";
import { Spin } from "antd";
import { ProductContext } from "../../Context/ProductProvider";
import { AuthContext } from "../../Context/auth";
import { objectAssign } from "../../Utils/ReusableSyntax";
import { X } from "react-feather";

//const date = new Date();

const inputStyle =
  "text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10";

const initialState = {
  imageUrl: "",
  socks: "",
  price: "",
  riceVariety: "",
  email: "",
  description: "",
  uid: "",
};

export default function Bidding({ open, onClose, id }) {
  const { imageUrl, socks, price, riceVariety, email, description, uid } =
    initialState;

  const [bidding, setBidding] = useState(0);
  const [getSocks, setSocks] = useState(0);
  const [loading, setLoading] = useState(false);

  const { fetchProd, setId } = useContext(ProductContext);
  const context = useContext(AuthContext);
  fetchProd && objectAssign(fetchProd, initialState);

  const Loading = () => setLoading(true);

  useEffect(() => {
    id && setId(id);
  }, [id, setId]);

  const clearState = () => {
    setBidding(0);
    setSocks(0);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const document = app.firestore().collection("transaction").doc();

    const checkSocks = Number(getSocks) > Number(socks);
    const checkBidding = Number(bidding) === 0;

    if (checkSocks) {
      return swal({
        title: "Warning!!!",
        text: `Invalid attempt socks`,
        icon: "warning",
        button: "Ok",
      });
    }

    if (checkBidding) {
      return swal({
        title: "Warning!!!",
        text: `Invalid attempt Bidding`,
        icon: "warning",
        button: "Ok",
      });
    }

    if (!checkSocks && !checkBidding) {
      Loading();
      document
        .set({
          owned: null,
          imageUrl,
          socks: Number(getSocks),
          tradersEmail: context.email,
          productId: fetchProd[0].id,
          riceVariety: riceVariety,
          biddingPrice: Number(bidding),
          reviewStatus: true,
          biddingStatus: true,
          uid: context.uid,
          farmerId: uid,
        })
        .then(() => {
          setLoading(false);
          clearState();
          swal({
            title: "Successfully",
            text: `Successfully added your bid`,
            icon: "success",
            button: "Ok",
          });
        });
    }
  };

  return (
    <MyModal
      className="max-w-4xl h-auto mx-auto rounded-lg p-10 relative h-auto"
      isOpen={open}
    >
      <X
        onClick={(event) => onClose(event)}
        className="w-6 h-6 absolute inset-y-4 right-4 cursor-pointer"
      />
      <Spin spinning={loading}>
        <section className="md:flex gap-4 mt-60 md:mt-0">
          <Card

            imageUrl={imageUrl}
            kilograms={socks}
            price={price}
            riceVariety={riceVariety}
            email={email}
            description={description}
          />
          <div className="w-full mt-4 md:mt-0">
            <h1 className="text-2xl font-bold">Bidding Information</h1>
            <h2 className="my-2 text-sm text-red-500">
              Traders Email :{" "}
              <strong className="text-red-500">{context.email}</strong>
            </h2>
            <form action="" onSubmit={(event) => onSubmit(event)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <input
                  value={email}
                  readOnly={true}
                  required
                  type="text"
                  className={`${inputStyle} bg-gray-200 `}
                  placeholder="email"
                  name="email"
                />
                <input
                  value={socks}
                  readOnly={true}
                  required
                  type="number"
                  className={`${inputStyle} bg-gray-200 `}
                  placeholder="socks"
                  name="socks"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <input
                  value={price}
                  readOnly={true}
                  required
                  type="number"
                  className={`${inputStyle} bg-gray-200 `}
                  placeholder="Price Per Kilo"
                  name="pricePerKilo"
                />
                <input
                  value={riceVariety}
                  readOnly={true}
                  required
                  type="text"
                  className={`${inputStyle} bg-gray-200 `}
                  placeholder="Rice Variety"
                  name="riceVarity"
                />
              </div>
              <div className="mt-4">
                <textarea
                  value={description}
                  readOnly={true}
                  id="description"
                  required
                  name="description"
                  placeholder="Description..."
                  className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  cols={20}
                  rows={2}
                />
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="" className="font-bold text-sm">Number of Socks</label>
                    <input
                      required
                      onChange={(event) => setSocks(event.target.value)}
                      value={getSocks}
                      type="number"
                      className={`${inputStyle} bg-gray-100 mt-2`}
                      placeholder="Bidding price"
                      name="biddingPrice"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold text-sm">Bidding</label>
                    <input
                      required
                      onChange={(event) => setBidding(event.target.value)}
                      value={bidding}
                      type="number"
                      className={`${inputStyle} bg-gray-100 mt-2`}
                      placeholder="Bidding price"
                      name="biddingPrice"
                    />
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full bg-primary hover:bg-primary-slight text-white text-sm py-2 font-semibold rounded-sm focus:outline-none focus:shadow-outline h-10">
                Place your bid
              </button>
            </form>
          </div>
        </section>
      </Spin>
    </MyModal>
  );
}
