import axios from 'axios';

const API_URL = '/.netlify/functions/nasa-apod-api';

const fetchApodData = async (date) => {
    try {
        const {data} = await axios.get(API_URL, {
            params: {
                date
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
}

const fetchApodDataQuery = async ({queryKey}) => fetchApodData(queryKey[1])

export {fetchApodData, fetchApodDataQuery, API_URL};
