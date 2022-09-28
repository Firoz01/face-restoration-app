import React, { useRef, useState } from "react";
import sampleInput from "../img/blurSample.png";
import sampleOutput from "../img/sampleOutput.jpg";
import "./Home.css";
import { UilScenery } from "@iconscout/react-unicons";
import axios from "axios";
import { saveAs } from "file-saver";

const Home = () => {
  const url = "https://facial-restoration-api.herokuapp.com/api/v1/restore/";
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [downlode, setDownlode] = useState(false);

  const downlodeImage = () => {
    saveAs(output, "output.png");
  };

  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  var data;

  const handleSubmit = () => {
    if (image) {
      data = new FormData();
      data.append("image", image);
    }
    try {
      setLoading(true);
      axios.post(url, data).then((res) => {
        setOutput(res.data.restoreImageOutput);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="home container-fluid d-flex flex-column justify-content-center align-items-center w-100 mx-3 mt-2">
      <h2 className="px-5 mt-4 mb-5 text-dark">
        Welcome To Face Restoration App
      </h2>
      <p className="text-dark">
        This app focusing on how to restore old blury damage image into high
        quality image <span className="text-primary">See Example below</span>
      </p>

      <div className="d-flex mt-5 pt-3">
        <div className="mx-1">
          <h4 className="text-primary">Given Image</h4>
          {image ? (
            <img className="preview" src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img className="preview" src={sampleInput} alt="" />
          )}
        </div>

        {loading ? (
          <div
            class="spinner-border text-primary loading mt-3 mx-3"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="mx-2">
            <h4 className="text-success px-4">Output</h4>
            {output ? (
              <img
                className="preview "
                src={output}
                alt=""
                onClick={downlodeImage}
              />
            ) : (
              <img className="preview " src={sampleOutput} alt="" />
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => imageRef.current.click()}
        type="button"
        className="btn btn-primary px-3 mt-5 color"
        disabled={loading}
      >
        Select Image <UilScenery />
      </button>
      <button
        type="button"
        className="btn btn-primary px-4 mt-2 color"
        onClick={handleSubmit}
        disabled={loading}
      >
        Run Now
      </button>
      <div style={{ display: "none" }}>
        <input
          type="file"
          name="myImage"
          ref={imageRef}
          onChange={onImageChange}
        />
      </div>
      <small className=" text-light mt-5">
        Thank you for using our application <br /> This application is created
        by National university's CSE Department Students
      </small>
    </div>
  );
};

export default Home;
