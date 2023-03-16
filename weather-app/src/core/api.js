import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getCities = async (city) => {
  if (city.length < 3) return;

  try {
    const response = await HTTP.get('find', {
          params: {
            q: city,
            type: 'like',
            sort: 'population',
            cnt: 10,
            appid: `${import.meta.env.VITE_API_KEY}`
          }
        });
    return response.data.list;
  } catch (error) {
   console.log(error, 'Something went wrong, with query for cities list');
  }
}

export const getCityById = async (id) => {
  try {
    const response = await HTTP.get(`weather?id=${id}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
    return response;
  } catch (error) {
    console.log(error, 'Something went wrong, when query for a city');
  }
}
export const buildWeatherIconURL = (code) => {
  const ICONS_BASE_URL = 'https://openweathermap.org/img/wn/';
  return `${ICONS_BASE_URL}${code}@2x.png`;
}