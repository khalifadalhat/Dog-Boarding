import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDogData } from "../../context/DogDataContext";

export const DetailsPage = () => {
  const { formData, setFormData } = useDogData();
  const [rate, setRate] = useState(formData.details?.rate || 0);
  const navigate = useNavigate();

  const handleRateChange = (event) => {
    const newRate = event.target.value;
    setRate(newRate);
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        rate: newRate,
      },
    }));
  };

  const handleNext = async () => {
    try {
      navigate("/additional-details");
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <div>
      <h2>We're almost there; just a few more additional details to go</h2>
      <p>What rate are you offering for this job</p>
      <div>
        <label>
          $ 
          <input
            type="number"
            value={rate}
            onChange={handleRateChange}
          />
          / day
        </label>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};
