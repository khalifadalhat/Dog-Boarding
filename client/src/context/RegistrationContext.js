import { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const useRegistrationData = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    postalCode: "",
    agreedToTerms: false,
    address: "",
    password: "",
    confirmPassword: "",
  });

  const updateRegistrationData = (data) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };


  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};
