import React from "react";
import { useNavigate } from "react-router-dom";
import { useDogData } from "../../context/DogDataContext";

const DogInfo = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useDogData();
  const { pet } = formData;

  const handleGenderChange = (event) => {
    const genderValue = event.target.value;
    setFormData({ pet: { ...pet, gender: genderValue } });
  };

  const handleSpayedNeuteredChange = (event) => {
    const spayedNeuteredValue = event.target.value;
    setFormData({ pet: { ...pet, spayedNeutered: spayedNeuteredValue } });
  };

  const handleWeightChange = (event) => {
    const weightValue = event.target.checked ? event.target.value : ''; 
    setFormData({ pet: { ...pet, weight: weightValue } });
  };

  const handleNext = async () => {
    navigate("/dog-info-screen");
  };

  return (
    <div>
      <h2>How would you describe your pet?</h2>
      <div>
        <label>Gender:</label>
        <input
          type="radio"
          value="male"
          checked={pet.gender === "male"}
          onChange={handleGenderChange}
        />
        <label>Male</label>
        <input
          type="radio"
          value="female"
          checked={pet.gender === "female"}
          onChange={handleGenderChange}
        />
        <label>Female</label>
      </div>
      <div>
        <label>Spayed/Neutered:</label>
        <input
          type="radio"
          value="yes"
          checked={pet.spayedNeutered === "yes"}
          onChange={handleSpayedNeuteredChange}
        />
        <label>Yes</label>
        <input
          type="radio"
          value="not_sure"
          checked={pet.spayedNeutered === "not_sure"}
          onChange={handleSpayedNeuteredChange}
        />
        <label>Not sure</label>
        <input
          type="radio"
          value="no"
          checked={pet.spayedNeutered === "no"}
          onChange={handleSpayedNeuteredChange}
        />
        <label>No</label>
      </div>
      <div>
        <label>Weight:</label>
        <div>
          <input
            type="checkbox"
            value="5-20"
            checked={pet.weight === "5-20"}
            onChange={handleWeightChange}
          />
          <label>5 - 20 lb small</label>
        </div>
        <div>
          <input
            type="checkbox"
            value="21-50"
            checked={pet.weight === "21-50"}
            onChange={handleWeightChange}
          />
          <label>21 - 50 lb medium</label>
        </div>
        <div>
          <input
            type="checkbox"
            value="51-99"
            checked={pet.weight === "51-99"}
            onChange={handleWeightChange}
          />
          <label>51 - 99 lb large</label>
        </div>
        <div>
          <input
            type="checkbox"
            value="100+"
            checked={pet.weight === "100+"}
            onChange={handleWeightChange}
          />
          <label>100+ lb extra large</label>
        </div>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default DogInfo;
