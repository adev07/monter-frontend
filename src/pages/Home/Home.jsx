import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaBriefcase,
  FaCalendar,
  FaInfoCircle,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    age: "",
    work: "",
    dob: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data;
        setUser(userData);
        setFormData({
          name: userData.name,
          location: userData.location,
          age: userData.age,
          work: userData.work,
          dob: moment(userData.dob).format("YYYY-MM-DD"),
          description: userData.description,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age <= 0) {
      newErrors.age = "Age must be a positive number";
    }
    if (!formData.work) newErrors.work = "Work is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        ...formData,
        dob: moment(formData.dob).toISOString(),
      }));
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error updating user data");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer />
      <header className="bg-white shadow py-6 px-4 sm:px-6 lg:px-8 flex justify-between sticky top-0">
        <div className="flex gap-4">
          <h1
            className="text-[16px] font-semibold text-gray-700 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </h1>
          <h1
            className="text-[16px] font-semibold text-gray-700 cursor-pointer"
            onClick={() => navigate("/books")}
          >
            Books
          </h1>
          <h1
            className="text-[16px] font-semibold text-gray-700 cursor-pointer"
            onClick={() => navigate("/add-review")}
          >
            Add Review
          </h1>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <h1 className="text-[16px] font-semibold text-gray-700 whitespace-nowrap">
            Welcome, {user?.name || "User"}
          </h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      <main className="flex-1 py-6 px-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen">
        <div className="flex justify-between items-center pb-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Profile Information
            </h2>
          </div>
          <div>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        </div>

        {user && !isEditing && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-700" />
                    <p>
                      <span className="font-bold text-gray-700">Name:</span>{" "}
                      {user.name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-700" />
                    <p>
                      <span className="font-bold text-gray-700">Email:</span>{" "}
                      {user.email}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaUserTag className="mr-2 text-gray-700" />
                    <p>
                      <span className="font-bold text-gray-700">Username:</span>{" "}
                      {user.userName}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-700" />
                    <p>
                      <span className="font-bold text-gray-700">Location:</span>{" "}
                      {user.location}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <FaBriefcase className="mr-2 text-gray-700" />
                    <p>
                      <span className="font-bold text-gray-700">Work:</span>{" "}
                      {user.work}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2 text-gray-700" />
                    <p>
                      <span className="font-bold text-gray-700">Age:</span>{" "}
                      {user.age}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaBirthdayCake className="mr-2 text-gray-700" />
                    <p>
                      <span className="font-bold text-gray-700">DOB:</span>{" "}
                      {moment(user.dob).format("MMMM Do, YYYY")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaInfoCircle className="mr-2 text-gray-700" />
                    <p>
                      <span className="font-bold text-gray-700">
                        Description:
                      </span>{" "}
                      {user.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <TextInput
                  label="Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name}</div>
                )}
              </div>
              <div>
                <TextInput
                  label="Location"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
                {errors.location && (
                  <div className="text-red-500">{errors.location}</div>
                )}
              </div>
              <div>
                <TextInput
                  label="Age"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  type="number"
                />
                {errors.age && <div className="text-red-500">{errors.age}</div>}
              </div>
              <div>
                <TextInput
                  label="Work"
                  id="work"
                  name="work"
                  value={formData.work}
                  onChange={handleInputChange}
                  required
                />
                {errors.work && (
                  <div className="text-red-500">{errors.work}</div>
                )}
              </div>
              <div>
                <TextInput
                  label="DOB"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  type="date"
                />
                {errors.dob && <div className="text-red-500">{errors.dob}</div>}
              </div>
              <div>
                <TextInput
                  label="Description"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  type="textarea"
                />
                {errors.description && (
                  <div className="text-red-500">{errors.description}</div>
                )}
              </div>
              <div className="col-span-2 flex justify-between items-center mt-4">
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  className="p-button-outlined p-button-danger"
                  onClick={() => setIsEditing(false)}
                />
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
