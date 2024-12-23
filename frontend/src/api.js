import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/reviews' });

export const fetchReviews = () => API.get('/');
export const createReview = (newReview) => API.post('/', newReview);
export const updateReview = (id, updatedReview) => API.patch(`/${id}`, updatedReview);
export const deleteReview = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/reviews/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error in deleteReview API:', err.response?.data || err.message);
        throw err;
    }
};