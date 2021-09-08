import { useState, useEffect } from "react";
import { app } from "../../config/firebase";
import { MyModal, Textfield } from "../";
import swal from "sweetalert";
import { Spin } from "antd";
import { MyDateString } from "../../Utils";
import { types } from "../../Utils/ReusableSyntax"

const initialState = {
  distributionDate: "",
  distributionType: "",

  organization: "",
  receiver: "",
  policeAddress: "",

  marketName: "",
  marketAddress: "",
  pricePerKilo: 0,

  calamity: "",
  calamityAddress: "",
  personInChange: "",

  quantity: 0,
  barangay: "",
  municipality: "",
  province: "",
};

const ACTIONS = {
  getPolice: "Police",
  getMarket: "Market",
  getRelief: "Relief Operation"
}

export default function AddDistribution({ isOpen, isClose }) {
  const [
    {
      distributionDate,
      distributionType,

      organization,
      receiver,
      policeAddress,

      marketName,
      marketAddress,
      pricePerKilo,

      calamity,
      calamityAddress,
      personInChange,

      quantity,
      barangay,
      municipality,
      province,
    },
    setState,
  ] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isTypes, setIsTypes] = useState({ police: false, market: false, relief: false })

  const onTypesSelect = () => {
    if (ACTIONS.getPolice === distributionType) {
      return setIsTypes(({ police }) => ({ police: !police, market: false, relief: false }))
    }

    if (ACTIONS.getMarket === distributionType) {
      return setIsTypes(({ market }) => ({ police: false, market: !market, relief: false }))
    }

    if (ACTIONS.getRelief === distributionType) {
      return setIsTypes(({ relief }) => ({ police: false, market: false, relief: !relief }))
    }

  }

  useEffect(onTypesSelect, [distributionType])

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const Loading = () => setLoading(true);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const document = app.firestore();

    Loading();

    const marketTotal = quantity * pricePerKilo

    if (ACTIONS.getPolice === distributionType) {
      return await document.collection("policeDistribution").add({
        organization,
        receiver,
        policeAddress,
      }).then((docRef) => {
        distributionInfo(docRef.id, "policeDistribution")
      })
    }

    if (ACTIONS.getMarket === distributionType) {
      return await document.collection("marketDistribution").add({
        marketName,
        marketAddress,
        price: Number(pricePerKilo),
        total: Number(marketTotal)
      }).then((docRef) => {
        distributionInfo(docRef.id, "marketDistribution")
      })
    }

    if (ACTIONS.getRelief === distributionType) {
      return await document.collection("reliefDistribution").add({
        calamity,
        calamityAddress,
        personInChange,
      }).then((docRef) => {
        distributionInfo(docRef.id, "reliefDistribution")
      })
    }

  };

  const distributionInfo = (id, name) => {
    const document = app.firestore().collection("distribution").doc();

    document
      .set({
        distributionTypeId: id,
        distributionDate,
        distributionName: name,
        distributionType,
        quantity: Number(quantity),
        barangay,
        municipality,
        province,
        date_created: MyDateString,
      })
      .then(() => {
        setLoading(false);
        clearState();
        swal({
          title: "Success",
          text: `Successfully Added`,
          icon: "success",
          button: "Ok",
        });
      });
  }

  const policeMarkdown = (
    <div className="grid grid-cols-3 gap-4">
      <Textfield
        type="text"
        placeholder="Organization"
        name="organization"
        value={organization}
        onChange={(event) => onChange(event)}
      />
      <Textfield
        type="text"
        placeholder="Receiver"
        name="receiver"
        value={receiver}
        onChange={(event) => onChange(event)}
      />
      <Textfield
        type="text"
        placeholder="Address"
        name="policeAddress"
        value={policeAddress}
        onChange={(event) => onChange(event)}
      />
    </div>
  )

  const marketMarkdown = (
    <div className="grid grid-cols-3 gap-4">
      <Textfield
        type="text"
        placeholder="Market Name"
        name="marketName"
        value={marketName}
        onChange={(event) => onChange(event)}
      />
      <Textfield
        type="text"
        placeholder="Market Address"
        name="marketAddress"
        value={marketAddress}
        onChange={(event) => onChange(event)}
      />
      <Textfield
        type="number"
        placeholder="Price Per Kilo"
        name="pricePerKilo"
        value={pricePerKilo}
        onChange={(event) => onChange(event)}
      />
    </div>
  )

  const reliefMarkdown = (
    <div className="grid grid-cols-3 gap-4">
      <Textfield
        placeholder="Calamity"
        name="calamity"
        value={calamity}
        onChange={(event) => onChange(event)}
      />
      <Textfield
        type="text"
        placeholder="Address"
        name="calamityAddress"
        value={calamityAddress}
        onChange={(event) => onChange(event)}
      />
      <Textfield
        type="text"
        placeholder="Person in Change"
        name="personInChange"
        value={personInChange}
        onChange={(event) => onChange(event)}
      />
    </div>
  )

  return (
    <MyModal
      className="max-w-xl w-full h-full md:h-4/6 mx-auto p-8 rounded-sm"
      isOpen={isOpen}
    >
      <Spin spinning={loading}>
        <h1 className="text-2xl text-primary font-semibold mt-2">
          Distribution Information
        </h1>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex items-center">
            <Textfield
              type="date"
              onChange={(event) => onChange(event)}
              label="Distribution Date"
              value={distributionDate}
              name="distributionDate"
              placeholder="Distribution Date"
            />
            <select value={distributionType} name="distributionType" onChange={(event) => onChange(event)} className="block w-full h-10 mt-8 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value=""></option>
              {types.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
            {/* <Textfield
              type="text"
              onChange={(event) => onChange(event)}
              label="Distribution Type"
              value={distributionType}
              name="distributionType"
              placeholder="Distribution Type"
            /> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Textfield
              type="number"
              onChange={(event) => onChange(event)}
              value={quantity}
              label="Quantity"
              name="quantity"
              placeholder="Quantity"
            />
            <Textfield
              type="text"
              onChange={(event) => onChange(event)}
              label="Barangay"
              value={barangay}
              name="barangay"
              placeholder="Barangay"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Textfield
              type="text"
              onChange={(event) => onChange(event)}
              label="Municipality"
              value={municipality}
              name="municipality"
              placeholder="Municipality"
            />
            <div className="w-full">
              <Textfield
                type="text"
                onChange={(event) => onChange(event)}
                label="Province"
                value={province}
                name="province"
                placeholder="Province"
              />
            </div>
          </div>
          {distributionType !== "" && (
            <div className="my-2">
              <h1 className="text-lg font-semibold">{distributionType} Details</h1>
              {isTypes.police && policeMarkdown}
              {isTypes.market && marketMarkdown}
              {isTypes.relief && reliefMarkdown}
            </div>
          )}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={(event) => isClose(event)}
              className="px-6 py-1 border border-primary bg-gray-100 hover:bg-gray-200 text-black text-sm rounded-sm focus:outline-none focus:shadow-outline "
            >
              Cancel
            </button>
            <button
              onClick={(event) => onSubmit(event)}
              className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm"
            >
              Save
            </button>
          </div>
        </form>
      </Spin>
    </MyModal>
  );
}
