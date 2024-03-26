import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDogData } from "../../context/DogDataContext";

export const DogRegistration = () => {
  const { formData, setFormData } = useDogData();
  const [breeds, setBreeds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/list/all"
        );
        const breedData = response.data.message;
        const allBreeds = Object.keys(breedData);
        setBreeds(allBreeds);
      } catch (error) {
        console.error("Error fetching dog breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      pet: {
        ...formData.pet,
        name: event.target.value,
      },
    });
  };

  const handleBirthdayChange = (event) => {
    setFormData({
      ...formData,
      pet: {
        ...formData.pet,
        birthday: event.target.value,
      },
    });
  };

  const handleBreedChange = (event) => {
    setFormData({
      ...formData,
      pet: {
        ...formData.pet,
        breed: event.target.value,
      },
    });
  };

  const handleNext = async () => {
    navigate("/dog-info");
  };

  return (
    <div>
      <h2>
        Hello! First, let's get some basic info about your pet before we find
        the perfect dog sitter.
      </h2>
      <div>
        <input
          type="text"
          value={formData.pet.name}
          onChange={handleNameChange}
          placeholder="Enter pet name"
        />
      </div>
      <div>
        <input
          type="date"
          value={formData.pet.birthday}
          onChange={handleBirthdayChange}
          placeholder="Select pet birthday"
        />
      </div>
      <div>
        <select
          value={formData.pet.breed}
          onChange={handleBreedChange}
          placeholder="Select a dog breed"
        >
          <option value="">Select a breed</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};


