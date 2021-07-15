import { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import { Divider, Spin } from "antd";
import { MyModal, Textfield } from "../../components";
import { MyDateString } from "../../Utils";
import swal from "sweetalert";
import httpRequest from "../../api/httpRequest";

export default function Confirmation({ isToggle }) {
  const [loading, setLoading] = useState(false);
  const [farmLocation, setFarmLocation] = useState("");
  const [landSize, setLandSize] = useState("");
  const context = useContext(AuthContext);

  const Loading = () => setLoading(false);

  const onSubmit = (event) => {
    event.preventDefault();

    Loading();

    httpRequest
      .post(
        "/.netlify/functions/index?name=farmLocation&&component=userInformationComponent",
        {
          uid: context.uid,
          farmLocation,
          landSize,
          date_created: MyDateString,
        }
      )
      .then(() => {
        setLoading(false);
        setFarmLocation("");
        setLandSize("");
        swal({
          title: "Success",
          text: `Successfully Added`,
          icon: "success",
          button: "Ok",
        });
      });
  };

  return (
    <MyModal
      className="max-w-sm w-full h-full md:h-80 mx-auto p-6"
      isOpen={true}
    >
      <div className="max-w-2xl mx-auto">
        <Spin spinning={loading}>
          <h1 className="text-xl text-primary font-semibold text-left mt-2">
            Farm Location
          </h1>
          <p>
            Before you proceed please do put a Farm location and Land size of
            your field
          </p>
          <Textfield
            value={farmLocation}
            name={farmLocation}
            onChange={(event) => setFarmLocation(event.target.value)}
            placeholder="Farm Location"
          />
          <Textfield
            value={landSize}
            name={landSize}
            onChange={(event) => setLandSize(event.target.value)}
            placeholder="Land Size"
          />
          <Divider />

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={(event) => onSubmit(event)}
              className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm"
            >
              Save
            </button>
          </div>
        </Spin>
      </div>
    </MyModal>
  );
}
