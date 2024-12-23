import React, { useEffect, useState } from 'react';
import { fetchReviews, deleteReview } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

const ReviewList = ({ onEdit }) => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filterOption, setFilterOption] = useState('');
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        fetchReviews()
            .then((response) => {
                setReviews(response.data);
                setFilteredReviews(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching reviews:', err);
                setError('Failed to load reviews. Please try again later.');
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        deleteReview(id)
            .then(() => {
                const updatedReviews = reviews.filter((review) => review._id !== id);
                setReviews(updatedReviews);
                setFilteredReviews(updatedReviews);
                alert('Review deleted successfully.');
            })
            .catch((err) => {
                console.error('Error deleting review in handleDelete:', err);
                alert('Failed to delete review. Please try again.');
            });
    };
    

    const handleFilter = () => {
        let updatedReviews = [...reviews];

        if (filterOption === 'recent') {
            updatedReviews.sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
        } else if (filterOption === 'oldest') {
            updatedReviews.sort((a, b) => new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0));
        }

        if (minRating > 0) {
            updatedReviews = updatedReviews.filter((review) => review.rating >= minRating);
        }

        setFilteredReviews(updatedReviews);
    };

    const handleClearFilters = () => {
        if (window.confirm('Are you sure you want to clear all filters?')) {
            setFilterOption('');
            setMinRating(0);
            setFilteredReviews(reviews);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <div className="text-center mt-4">Loading reviews...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-4">{error}</div>;
    }

    if (reviews.length === 0) {
        return <div className="alert alert-info mt-4">No reviews available. Add some!</div>;
    }

    return (
        <div className="mt-4">
            <h2 className="mb-4 text-center">Book Reviews</h2>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <label className="me-2">Filter by Date:</label>
                    <select
                        className="form-select form-select-sm d-inline-block w-auto"
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="recent">Most Recent</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <div>
                    <label className="me-2">Minimum Rating:</label>
                    <input
                        type="number"
                        className="form-control form-control-sm d-inline-block w-auto"
                        min="0"
                        max="5"
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                    />
                </div>
                <div>
                    <button className="btn btn-primary btn-sm me-2" onClick={handleFilter}>
                        <FontAwesomeIcon icon={faFilter} className="me-1" />
                        Apply Filters
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleClearFilters}>
                        <FontAwesomeIcon icon={faTimes} className="me-1" />
                        Clear Filters
                    </button>
                </div>
            </div>

            <div className="row">
                {filteredReviews.map((review) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={review._id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-primary">{review.bookTitle}</h5>
                                <h6 className="card-subtitle text-muted mb-2">{review.author}</h6>
                                <div className="mt-2 mb-3 text-warning">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <span key={i} style={{ fontSize: '1.2rem', marginRight: '2px' }}>★</span>
                                    ))}
                                </div>
                                <p className="card-text text-secondary">{review.reviewText}</p>
                                <p className="card-text text-muted">
                                    <small><strong>Added On:</strong> {formatDate(review.dateAdded)}</small>
                                </p>
                                <div className="mt-auto d-flex justify-content-between">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => onEdit(review)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(review._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
