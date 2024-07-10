import React, { useState } from "react";
import axios from "axios";
import TextInput from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function CompleteProfile() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/profile-completion`,
        {
          email,
          location,
          age,
          work,
          dob,
          description,
        }
      );
      localStorage.setItem('token', response.data.token);
      alert(response.data.message);
      navigate("/dasboard");
      setError("");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Complete Profile
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
          label="Location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          type="text"
        />
        <TextInput
          label="Age"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          type="number"
        />
        <TextInput
          label="Work"
          id="work"
          value={work}
          onChange={(e) => setWork(e.target.value)}
          required
          type="text"
        />
        <TextInput
          label="DOB"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          type="date"
        />
        <div className="w-full mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <Button type="submit" className="mt-4">
          Complete Profile
        </Button>
        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
      </form>
    </div>
  );
}

export default CompleteProfile;