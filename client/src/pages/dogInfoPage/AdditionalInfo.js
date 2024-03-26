import React from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDogData } from "../../context/DogDataContext";

export const DogAdditionalInfo = () => {
  const { formData, setFormData } = useDogData();
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      services: {
        ...prevData.services,
        [name]: checked,
      },
    }));
  };

  const handleNext = async () => {
    try {
      // await axios.post("", formData);
      console.log(formData);
      navigate("/details-page");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>We are almost there; just a little more additional details</h2>
      <p>Choose all that's applicable</p>
      <div>
        <label>
          <input
            type="checkbox"
            name="dogSitting"
            checked={formData.services && formData.services.dogSitting}
            onChange={handleCheckboxChange}
          />
          Dog sitting
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="dogWalking"
            checked={formData.services && formData.services.dogWalking}
            onChange={handleCheckboxChange}
          />
          Dog walking
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="dogGrooming"
            checked={formData.services && formData.services.dogGrooming}
            onChange={handleCheckboxChange}
          />
          Dog grooming
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="overnightCare"
            checked={formData.services && formData.services.overnightCare}
            onChange={handleCheckboxChange}
          />
          Dog overnight care
        </label>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};
