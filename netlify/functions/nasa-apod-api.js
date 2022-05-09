const axios = require('axios');

const APOD_API_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = process.env.NASA_API_KEY;

exports.handler = async function(event, context) {
    try {
        const {date} = event.queryStringParameters;
        const {data} = await axios.get(APOD_API_URL, {
            params: {
                api_key: API_KEY,
                date
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({data}),
        }
    } catch (err) {
        return {
          statusCode: 404,
          body: err.toString(),
        };
    }    
}
