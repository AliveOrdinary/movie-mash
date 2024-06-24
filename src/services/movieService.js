import axios from 'axios';
import { API_ENDPOINTS } from '../constants/apiConstants.js';

const fetchTop250Movies = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.getTop250Movies);
        return response.data;
    } catch (error) {
        console.error('Error fetching top 250 movies:', error);
        throw error;
    }
};

export { fetchTop250Movies };