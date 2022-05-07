import axios from 'axios';

const API_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchApodData = async ({queryKey}) => {
    const {data} = await axios.get(API_URL, {
        params: {
            api_key: API_KEY,
            date: queryKey[1]
        }
    });

    return data;
  };

export {fetchApodData, API_URL};
