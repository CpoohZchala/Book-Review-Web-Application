import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { createReview } from '../api'; // Ensure this API function is correctly implemented

const AddReviewForm = () => {
    // State to handle form data
    const [formData, setFormData] = useState({
        bookTitle: '',
        author: '',
        rating: 1,
        reviewText: '',
    });

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh

        try {
            // Call API to create a review
            await createReview(formData);

            // Optionally reset the form after successful submission
            setFormData({ bookTitle: '', author: '', rating: 1, reviewText: '' });

            // Refresh the page or show a success message
            window.location.reload(); // Replace with appropriate navigation or feedback
        } catch (error) {
            console.error('Error creating review:', error);
            alert('An error occurred while submitting the review.'); // Display error feedback
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 border rounded bg-light"
            style={{
                backgroundImage: "url('https://t3.ftcdn.net/jpg/04/44/25/44/240_F_444254452_3oqfuJ7Z9gxXxsdQ9X9Ghsc2pXpzzLMU.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: 'white' // Optional: Adjust text color for readability
            }}
        >
            {/* Book Title Input */}
            <div className="mb-3">
                <label htmlFor="bookTitle" className="form-label">Book Title</label>
                <input
                    id="bookTitle"
                    type="text"
                    className="form-control"
                    placeholder="Enter book title"
                    value={formData.bookTitle}
                    onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                    required
                />
            </div>

            {/* Author Input */}
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input
                    id="author"
                    type="text"
                    className="form-control"
                    placeholder="Enter author's name"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                />
            </div>

            {/* Rating Input */}
            <div className="mb-3">
                <label className="form-label">Rating</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={formData.rating}
                        onStarClick={(nextValue) => setFormData({ ...formData, rating: nextValue })}
                        renderStarIcon={(index, value) => (
                            <span
                                style={{
                                    fontSize: '2.5rem', // Increase the size of the stars
                                    color: index <= value ? '#ffc107' : '#ddd',
                                    cursor: 'pointer',
                                    transition: 'color 0.2s',
                                }}
                            >
                                ★
                            </span>
                        )}
                    />
                </div>
            </div>

            {/* Review Textarea */}
            <div className="mb-3">
                <label htmlFor="reviewText" className="form-label">Review</label>
                <textarea
                    id="reviewText"
                    className="form-control"
                    placeholder="Write your review here"
                    value={formData.reviewText}
                    onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                    rows={5}
                    required
                ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
    );
};

export default AddReviewForm;
