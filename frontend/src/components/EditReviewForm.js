import React, { useState, useEffect } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { updateReview } from '../api';

const EditReviewForm = ({ review, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({
        bookTitle: '',
        author: '',
        rating: 1,
        reviewText: '',
    });

    // Load the review data into the form
    useEffect(() => {
        if (review) {
            setFormData({
                bookTitle: review.bookTitle,
                author: review.author,
                rating: review.rating || 1, // Default to 1 if no rating is present
                reviewText: review.reviewText,
            });
        }
    }, [review]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!review || !review._id) {
            alert('Review ID not found. Cannot update.');
            return;
        }

        updateReview(review._id, formData)
            .then(() => {
                alert('Review updated successfully.');
                onUpdate(); // Callback to refresh the list
            })
            .catch((err) => {
                console.error('Error updating review:', err);
                alert('Failed to update review. Please try again.');
            });
    };

    return (
        <div className="p-4 border rounded bg-light"
        style={{
            backgroundImage: "url('https://t3.ftcdn.net/jpg/04/44/25/44/240_F_444254452_3oqfuJ7Z9gxXxsdQ9X9Ghsc2pXpzzLMU.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            color: 'white' // Optional: Adjust text color for readability
        }}>
            <h3 className="mb-4">Edit Review</h3>
            <form onSubmit={handleSubmit}>
                {/* Book Title Field */}
                <div className="mb-3">
                    <label className="form-label">Book Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.bookTitle}
                        onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                        required
                    />
                </div>

                {/* Author Field */}
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                    />
                </div>

                {/* Star Rating Field */}
                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <StarRatingComponent
                            name="rating"
                            starCount={5}
                            value={formData.rating}
                            onStarClick={(nextValue) => {
                                setFormData({ ...formData, rating: nextValue });
                            }}
                            renderStarIcon={(index, value) => (
                                <span
                                    style={{
                                        fontSize: '2rem',
                                        color: index <= value ? '#ffc107' : '#ddd',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s', // Smooth hover transition
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
                    <label className="form-label">Review</label>
                    <textarea
                        className="form-control"
                        value={formData.reviewText}
                        onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                        rows={5}
                        required
                    />
                </div>

                {/* Action Buttons */}
                <div className="d-flex">
                    <button type="submit" className="btn btn-primary me-2">
                        Save Changes
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditReviewForm;
