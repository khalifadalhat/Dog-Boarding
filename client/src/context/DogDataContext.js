import { createContext, useContext, useState } from "react";

const DogDataContext = createContext();

export const useDogData = () => useContext(DogDataContext);

export const DogDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    pet: {
      name: "",
      breed: "",
      birthday: "",
      gender: "",
      spayedNeutered: "",
      weight: "",
    },
    services: {
      dogSitting: false,
      dogWalking: false,
      dogGrooming: false,
      overnightCare: false,
    },
    address: "", 
    details: {  
      rate: 0,
      headline: "",
      jobDescription: "",
    },
  });

  return (
    <DogDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </DogDataContext.Provider>
  );
};
