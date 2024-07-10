import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ToastContainer } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validations
    if (!name || !email || !userName || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/register`,
        {
          email,
          userName,
          password,
          name,
        }
      );
      toast.success(response.data.message || "Please verify your OTP.");
      navigate("/verify-otp");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          if (errors[key].message) {
            toast.error(errors[key].message);
          }
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-28">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center"
      >
        <TextInput
          label="Full Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
        />
        <TextInput
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <TextInput
          label="Username"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          type="text"
        />
        <TextInput
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        <Button type="submit" className="mt-4">
          Register
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600 font-semibold">
        Already have an account?{" "}
        <a
          href="/"
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          Login
        </a>
      </p>
    </div>
  );
}

export default Register;
