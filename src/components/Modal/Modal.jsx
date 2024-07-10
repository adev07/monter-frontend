import React, { useState } from "react";
import axios from "axios";
import { Modal as Mod } from "antd";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, handleCancel, width, reloadBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!author) newErrors.author = "Author is required";
    if (!genre) newErrors.genre = "Genre is required";
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/add-book`,
        {
          title,
          author,
          genre,
          description,
        }
      );
      toast.success(response.data.message);
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      reloadBooks();
    } catch (error) {
      toast.error(error.response.data.error || "Failed to add book");
    }
  };

  return (
    <Mod
      width={width}
      footer={null}
      visible={isOpen}
      onCancel={handleCancel}
    >
      <ToastContainer />
      <div className="max-w-md mx-auto my-6">
        <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.author && <div className="text-red-500 text-sm">{errors.author}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.genre && <div className="text-red-500 text-sm">{errors.genre}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </Mod>
  );
};

export default Modal;
