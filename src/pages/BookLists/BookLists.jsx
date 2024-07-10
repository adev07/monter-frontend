import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FaBook, FaUser, FaTag } from 'react-icons/fa';

const BookLists = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/books`
      );
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddBooksClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const reloadBooks = () => {
    fetchBooks();
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="">
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
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        handleCancel={handleCancel}
        reloadBooks={reloadBooks}
        width={600}
      />
      <div className="lg:px-8 mx-auto py-8 min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Book Listings</h2>
          </div>
          <div>
            <Button onClick={handleAddBooksClick}>Add New Book</Button>
          </div>
        </div>

        {loading ? (
          <p className="text-white text-center">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-white text-center">No books found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <li
              key={book._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <Link to={`/books/${book._id}`} className="block p-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaBook className="mr-2 text-blue-500" /> {book.title}
                </h3>
                <p className="text-gray-800 flex items-center mt-2">
                  <FaUser className="mr-2 text-blue-500" /> Author: {book.author}
                </p>
                <p className="text-gray-800 flex items-center mt-2">
                  <FaTag className="mr-2 text-blue-500" /> Genre: {book.genre}
                </p>
                <p className="mt-4 text-gray-700 flex items-center">
                  {book.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default BookLists;
