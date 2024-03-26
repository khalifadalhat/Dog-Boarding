import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDogData } from "../../context/DogDataContext";

export const AdditionalDetails = () => {
  const { formData, setFormData } = useDogData();
  const { details } = formData;
  const [headline, setHeadline] = useState(details.headline);
  const [jobDescription, setJobDescription] = useState(details.jobDescription);
  const navigate = useNavigate();

  const handleHeadlineChange = (event) => {
    const newHeadline = event.target.value;
    setHeadline(newHeadline);
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        headline: newHeadline,
      },
    }));
  };

  const handleJobDescriptionChange = (event) => {
    const newJobDescription = event.target.value;
    setJobDescription(newJobDescription);
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        jobDescription: newJobDescription,
      },
    }));
  };

  const handleNext = async () => {
    try {
    //   await axios.post("", formData);
      console.log(formData);
      navigate("/next-page");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>We're almost there; just a few more additional details to go</h2>
      <h3>Headline</h3>
      <p>State what you want and are willing to offer</p>
      <div>
        <input
          type="text"
          value={headline}
          onChange={handleHeadlineChange}
          placeholder="Seeking for reliable dog sitter in Chinatown, VA, $5 Daily pay"
        />
      </div>
      <h3>Job Description</h3>
      <p>Describe the responsibility and skills required for the job</p>
      <div>
        <textarea
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          placeholder="Describe the responsibilities and skills required for the job"
        />
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};
