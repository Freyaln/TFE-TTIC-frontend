import axios from 'axios';

const KEY = process.env.REACT_APP_API_KEY;
const URL = process.env.REACT_APP_API_URL;

export const winesApi = {
    fetchDishes: async (payload: string) => {
        const newParam = payload && payload.includes(' ') ? payload.replace(/\s/g, '_') : payload;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.get(`${URL}food/wine/dishes?wine=${newParam}&apiKey=${KEY}`, config);
        return response.data;
    },
};
