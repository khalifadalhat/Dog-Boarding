import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import countryCodes from "../../services/countryCodes";
import SecondScreen from "./SecondScreen";
import { useRegistrationData } from "../../context/RegistrationContext";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  postalCode: yup.string().required("Postal Code is required"),
  agreedToTerms: yup
    .boolean()
    .oneOf([true], "You must agree to terms and conditions"),
});

const SignUpForm = () => {
  const [showSecondScreen, setShowSecondScreen] = useState(false);
  const { registrationData, updateRegistrationData } = useRegistrationData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    updateRegistrationData(data);
    setShowSecondScreen(true);
    console.log(registrationData);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {!showSecondScreen ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("fullName")} placeholder="Full Name" />
          {errors.fullName && <p>{errors.fullName.message}</p>}

          <input {...register("email")} placeholder="Email" />
          {errors.email && <p>{errors.email.message}</p>}

          <div>
            <Select options={countryCodes} placeholder="Select Country Code" />
            <input {...register("phone")} placeholder="Phone" />
            {errors.phone && <p>{errors.phone.message}</p>}
          </div>

          <input {...register("postalCode")} placeholder="Postal Code" />
          {errors.postalCode && <p>{errors.postalCode.message}</p>}

          <button type="submit">Continue</button>
        </form>
      ) : (
        <SecondScreen />
      )}
      <hr />
      <button>Sign Up with Facebook</button>
      <button>Sign Up with Google</button>

      <label>
        <input {...register("agreedToTerms")} type="checkbox" />I agree to the
        terms and conditions
      </label>
      {errors.agreedToTerms && <p>{errors.agreedToTerms.message}</p>}
    </div>
  );
};

export default SignUpForm;
