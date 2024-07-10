import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailOrUsername || !password) {
      return toast.error("Please fill in all fields.");
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        {
          emailOrUsername,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border rounded px-8 py-[100px] mb-4 flex flex-col items-center justify-center"
      >
        <TextInput
          label="Email or Username"
          id="emailOrUsername"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
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
          Login
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600 font-semibold">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          Register
        </a>
      </p>
    </div>
  );
}

export default Login;
