import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function VerifyOtp() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/verify-otp`,
        {
          email,
          otp,
        }
      );
      alert(response.data.message);
      setError("");
      navigate("/profile-completion");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-28">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Verify OTP
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center"
      >
        <TextInput
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <TextInput
          label="OTP"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          type="text"
        />
        <Button type="submit" className="mt-4">
          Verify OTP
        </Button>
        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
      </form>
    </div>
  );
}

export default VerifyOtp;
