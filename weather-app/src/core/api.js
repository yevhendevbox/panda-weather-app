import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const CITIES_LIST = axios.create({
  baseURL: 'https://api.opencagedata.com/geocode/v1/json',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getDefaultCity = async (city) => {
  try {
    const response = await HTTP.get('weather', {
          params: {
            q: city,
            appid: `${import.meta.env.VITE_API_KEY}`,
            units: 'metric'
          }
        });
    return response;
  } catch (error) {
   console.log(error, 'Something went wrong, with query for cities list');
  }
}

export const getCitiesByChanks = async (city) => {
  try {
    const response = CITIES_LIST.get('', {
      params: {
        q: city,
        key: `${import.meta.env.VITE_OPENCAGE_API_KEY}`,
        limit: 10,
        min_confidence: 3
      }
    });
    return response;
  } catch (error) {
    console.log(error, 'Something went wrong, with query for cities list');
  }
}

export const getCityByLoc = async (lat, lon) => {
  try {
    const response = HTTP.get('weather', {
      params: {
        lat: lat,
        lon: lon,
        appid: `${import.meta.env.VITE_API_KEY}`,
        units: 'metric'
      },
    })
    return response;
  } catch (error) {
    console.log(error, 'Something went wrong, when query for a city');
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

export const getCityForecastData = async (city) => {
  try {
    const response = await HTTP.get('forecast', {
      params: {
        q: city,
        appid: `${import.meta.env.VITE_API_KEY}`,
        units: 'metric'
      }
    })
    return response;
  } catch (error) {
    console.log(error, 'Something went wrong, on forecast query');
  }
}

export const multipleCitiesQuery = async (city_ids) => {
  try {
    const response = await HTTP.get('group', {
      params: {
        id: city_ids,
        units: 'metric',
        appid: `${import.meta.env.VITE_API_KEY}`
      }
    });
    return response;
  } catch (error) {
    console.log(error, 'Something went wrong, on multiple cities query');
  }
}

export const buildWeatherIconURL = (code) => {
  const ICONS_BASE_URL = 'https://openweathermap.org/img/wn/';
  return `${ICONS_BASE_URL}${code}@2x.png`;
}