import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "../../components/ReviewModal/ReviwModal";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaBook, FaUser, FaTag } from "react-icons/fa";

const AddReview = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 1,
    comment: "",
  });

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

  const handleBookClick = (bookId) => {
    const book = books.find((book) => book._id === bookId);
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/books/${selectedBook._id}/reviews`,
        { ...reviewFormData, bookId: selectedBook._id }
      );
      console.log(response.data);
      setIsModalOpen(false);
      toast.success("Review added successfully");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleRatingChange = (event) => {
    setReviewFormData({
      ...reviewFormData,
      rating: parseInt(event.target.value),
    });
  };

  const handleCommentChange = (event) => {
    setReviewFormData({
      ...reviewFormData,
      comment: event.target.value,
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
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
      <div className="px-8 py-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Add Review</h2>
        </div>

        {loading ? (
          <p className="text-white">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-white">No books found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {books.map((book) => (
              <li
                key={book._id}
                className="bg-white shadow-lg overflow-hidden rounded-lg p-4 border flex flex-col justify-between"
              >
                <Link to={`/books/${book._id}`} className="block mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FaBook className="mr-2 text-blue-500" /> {book.title}
                  </h3>
                  <p className="text-gray-800 flex items-center mt-2">
                    <FaUser className="mr-2 text-blue-500" /> Author:{" "}
                    {book.author}
                  </p>
                  <p className="text-gray-800 flex items-center mt-2">
                    <FaTag className="mr-2 text-blue-500" /> Genre: {book.genre}
                  </p>
                  <p className="mt-2 text-gray-800">{book.description}</p>
                </Link>
                <Button onClick={() => handleBookClick(book._id)}>
                  Add Review
                </Button>
              </li>
            ))}
          </ul>
        )}

        {/* Modal for adding review */}
        {selectedBook && (
          <Modal
            isOpen={isModalOpen}
            handleCancel={handleModalClose}
            handleSubmit={handleReviewSubmit}
            width={400}
          >
            <h2 className="text-xl font-semibold mb-4">
              Add Review for {selectedBook.title}
            </h2>
            <label className="block">
              Rating:
              <select
                value={reviewFormData.rating}
                onChange={handleRatingChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>
            <label className="block mt-4">
              Comment:
              <textarea
                value={reviewFormData.comment}
                onChange={handleCommentChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AddReview;
