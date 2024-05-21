import axios from 'axios';
import rateLimit from "axios-rate-limit"

const Base_Url = 'https://youtube-v31.p.rapidapi.com';
const options = {
  params: {
    part: 'snippet,id',
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key': '11b423787cmsh726bf12b04bd74ap13efacjsn6443a14ac189',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1000 });

export const FetchFromApi = async (url) => {
  try {
    const response = await http.get(`${Base_Url}/${url}`, options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from the API');
  }
};
