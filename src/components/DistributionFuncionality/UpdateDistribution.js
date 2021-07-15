import { useState, useEffect } from "react";
import { app } from "../../config/firebase";
import { MyModal, Textfield } from "../";
import swal from "sweetalert";
import { Spin } from "antd";
import { objectAssign } from "../../Utils/ReusableSyntax";
import { MyDateString } from "../../Utils";

const initialState = {
  distributionDate: "",
  distributionType: "",
  quantity: "",
  barangay: "",
  municipality: "",
  province: "",
};

export default function UpdateDistribution({ isOpen, isClose, id }) {
  const [
    {
      distributionDate,
      distributionType,
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
    const document = app.firestore().collection("distribution").doc(id);
    document.onSnapshot((snapshot) => {
      const items_array = [];
      if (snapshot) {
        items_array.push({ ...snapshot.data() });
        setDistributionInformation(items_array);
      }
    });

    return () => {
      setDistributionInformation([]);
    };
  }, [id]);

  const onSubmit = (event) => {
    event.preventDefault();

    Loading();
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

  return (
    <MyModal
      className="max-w-xl w-full h-full md:h-4/6 mx-auto p-6"
      isOpen={isOpen}
    >
      <Spin spinning={loading}>
        <h1 className="text-2xl text-primary font-semibold text-center mt-2">
          Distribution Information
        </h1>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Textfield
              type="date"
              onChange={(event) => onChange(event)}
              label="Distribution Date"
              value={distributionDate}
              name="distributionDate"
              placeholder="Distribution Date"
            />
            <Textfield
              type="text"
              onChange={(event) => onChange(event)}
              label="Distribution Type"
              value={distributionType}
              name="distributionType"
              placeholder="Distribution Type"
            />
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
