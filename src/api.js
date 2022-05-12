import axios from 'axios';

const API_URL = '/.netlify/functions/nasa-apod-api';

const fetchApodData = async ({queryKey}) => {
    try {
        const {data} = await axios.get(API_URL, {
            params: {
                date: queryKey[1]
            }
        });
        
        if (data.code) {
            throw new Error(`Error ${data.code}: ${data.msg}`);
        }

        return data;
    }
    catch(err) {
        throw err;
    }
  };

export {fetchApodData, API_URL};
