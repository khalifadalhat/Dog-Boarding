import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one number, and one symbol"
    ),
});

const LoginPage = () => {
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );
      const token = response.token;

      localStorage.setItem("token", token);
      navigate("/dog-registration");
      console.log(data);
    } catch (error) {
      console.log("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Welcome back, pawsome pet parent!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="email" placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
