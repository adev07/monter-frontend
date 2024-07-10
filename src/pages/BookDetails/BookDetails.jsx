import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { toast, ToastContainer } from "react-toastify";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/books/${id}`
        );
        const reviewsResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/books/${id}/reviews`
        );

        setBook(bookResponse.data);
        setReviews(reviewsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
      starElements.push(<FaStar key={i} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      starElements.push(
        <FaStar half key={starElements.length} className="text-yellow-500" />
      );
    }

    const emptyStars = 5 - starElements.length;
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <FaRegStar key={starElements.length + i} className="text-yellow-500" />
      );
    }

    return starElements;
  };

  if (loading) {
    return <p>Loading book details...</p>;
  }

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
      <header className="bg-white shadow py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
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
      <div className="max-w-4xl mx-auto mt-8">
        {book ? (
          <div className="bg-white shadow overflow-hidden rounded-lg p-4 border">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="text-gray-500">Author: {book.author}</p>
            <p className="text-gray-500">Genre: {book.genre}</p>
            <p className="mt-2">{book.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Reviews:</h3>
              {reviews.length === 0 ? (
                <p>No reviews found.</p>
              ) : (
                <ul className="mt-2">
                  {reviews.map((review) => (
                    <li key={review._id} className="mb-2">
                      <p>{review.comment}</p>
                      <div className="flex mt-1">
                        {renderStarRating(review.rating)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p>Book not found.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
