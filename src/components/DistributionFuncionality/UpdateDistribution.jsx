import { useState, useEffect } from "react";
import { app } from "../../config/firebase";
import { MyModal, Textfield } from "../";
import swal from "sweetalert";
import { Spin } from "antd";
import { objectAssign, types } from "../../Utils/ReusableSyntax";
import { MyDateString } from "../../Utils";

const initialState = {
  distributionDate: "",
  distributionType: "",
  distributionName: "",
  distributionTypeId: "",

  organization: "",
  receiver: "",
  policeAddress: "",

  marketName: "",
  marketAddress: "",
  price: 0,

  calamity: "",
  calamityAddress: "",
  personInChange: "",

  quantity: "",
  barangay: "",
  municipality: "",
  province: "",
};

const collectionTypes = {
  police: "policeDistribution",
  market: "marketDistribution",
  relief: "reliefDistribution",
};

const ACTIONS = {
  getPolice: "Police",
  getMarket: "Market",
  getRelief: "Relief Operation",
};

export default function UpdateDistribution({ isOpen, isClose, id }) {
  const [
    {
      distributionDate,
      distributionType,
      distributionName,
      distributionTypeId,

      organization,
      receiver,
      policeAddress,

      marketName,
      marketAddress,
      price,

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
  const [distributionInformation, setDistributionInformation] = useState([]);

  distributionInformation &&
    objectAssign(distributionInformation, initialState);

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const Loading = () => setLoading(true);

  const clearState = () => {
    setState({ ...initialState });
  };

  useEffect(() => {
    const document = app.firestore();
    const distributionDocs = document.collection("distribution").doc(id);
    distributionDocs.onSnapshot(async (snapshot) => {
      const items_array = [];
      if (snapshot) {
        const types =
          document
            .collection(snapshot.data()?.distributionName)
            .doc(snapshot.data().distributionTypeId);
        const getValue = await types.get();
        items_array.push({ ...snapshot.data(), ...getValue.data() });
        setDistributionInformation(items_array);
      }
    });

    return () => {
      setDistributionInformation([]);
    };
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const document = app.firestore();

    Loading();

    const marketTotal = quantity * price;

    if (ACTIONS.getPolice === distributionType) {
      return await document
        .collection("policeDistribution")
        .doc(distributionTypeId)
        .update({
          organization,
          receiver,
          policeAddress,
        })
        .then(() => {
          onUpdateDistribution();
        });
    }

    if (ACTIONS.getMarket === distributionType) {
      return await document
        .collection("marketDistribution")
        .doc(distributionTypeId)
        .update({
          marketName,
          marketAddress,
          price: Number(price),
          total: Number(marketTotal),
        })
        .then(() => {
          onUpdateDistribution();
        });
    }

    if (ACTIONS.getRelief === distributionType) {
      return await document
        .collection("reliefDistribution")
        .doc(distributionTypeId)
        .update({
          calamity,
          calamityAddress,
          personInChange,
        })
        .then(() => {
          onUpdateDistribution();
        });
    }
  };

  const onUpdateDistribution = () => {
    const document = app.firestore().collection("distribution").doc(id);

    document
      .update({
        distributionDate,
        distributionType,
        quantity,
        barangay,
        municipality,
        province,
        date_updated: MyDateString,
      })
      .then(() => {
        setLoading(false);
        clearState();
        swal({
          title: "Success",
          text: `Successfully Updated`,
          icon: "success",
          button: "Ok",
        });
      });
  };

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
  );

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
        name="price"
        value={price}
        onChange={(event) => onChange(event)}
      />
    </div>
  );

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
  );

  return (
    <MyModal
      className="max-w-xl w-full h-full md:h-4/6 mx-auto p-6 rounded-sm"
      isOpen={isOpen}
    >
      <Spin spinning={loading}>
        <h1 className="text-2xl text-primary font-semibold text-center mt-2">
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
            <select
              disabled
              value={distributionType}
              name="distributionType"
              onChange={(event) => onChange(event)}
              className="block w-full h-10 mt-8 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
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
              type="text"
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
          {distributionName !== undefined && (
            <div className="my-2">
              <h1 className="text-lg font-semibold">
                {distributionType} Details
              </h1>
              {distributionName === collectionTypes.market && marketMarkdown}
              {distributionName === collectionTypes.police && policeMarkdown}
              {distributionName === collectionTypes.relief && reliefMarkdown}
            </div>
          )}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={(event) => isClose(event)}
              className="px-6 py-1 border border-primary bg-gray-100 hover:bg-gray-200 text-black text-sm rounded-sm focus:outline-none focus:shadow-outline "
            >
              Close
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
