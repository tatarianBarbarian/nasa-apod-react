import axios from 'axios';

const API_URL = '/.netlify/functions/nasa-apod-api';

const fetchApodData = async ({queryKey}) => {
    const {data} = await axios.get(API_URL, {
        params: {
            date: queryKey[1]
        }
    });

    return data;
  };

export {fetchApodData, API_URL};
