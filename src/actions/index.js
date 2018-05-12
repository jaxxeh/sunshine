import axios from 'axios';
import {
  TOGGLE_UNITS,
  ADD_LOCATION,
  REMOVE_LOCATION,
  SHOW_DETAILS,
  HIDE_DETAILS,
  TOGGLE_ADD,
  UPDATE_WEATHER,
  LOAD_LOCATIONS,
} from './types';
import config from '../config';

export const toggleUnits = () => {
  return { type: TOGGLE_UNITS };
};

export const loadLocations = () => {
  return async dispatch => {
    let locations = JSON.parse(localStorage.getItem('locations')) || [];
    if (locations.length > 0) {
      locations = await Promise.all(
        locations.map(async l => {
          const details = await axios.get(
            `${config.apiUrl}/cities/details?q=${l.placeId}`,
          );
          const { lat, lng } = details.data.loc;
          const weather = await axios.get(
            `${config.apiUrl}/weather?units=metric&lat=${lat}&lon=${lng}`,
          );
          return {
            ...l,
            isCurrent: false,
            isSelected: false,
            ...details.data,
            weather: { ...weather.data },
          };
        }),
      );
      dispatch({
        type: LOAD_LOCATIONS,
        payload: locations,
      });
    }
  };
};

export const addLocation = (placeId, name, isCurrent) => {
  return async dispatch => {
    if (!isCurrent) {
      const locations = JSON.parse(localStorage.getItem('locations')) || [];
      localStorage.setItem(
        'locations',
        JSON.stringify([...locations, { placeId, name }]),
      );
    }
    const details = await axios.get(
      `${config.apiUrl}/cities/details?q=${placeId}`,
    );
    const { lat, lng } = details.data.loc;
    const weather = await axios.get(
      `${config.apiUrl}/weather?units=metric&lat=${lat}&lon=${lng}`,
    );
    dispatch({
      type: ADD_LOCATION,
      payload: {
        placeId,
        name,
        isCurrent,
        isSelected: false,
        ...details.data,
        weather: { ...weather.data },
      },
    });
  };
};

export const removeLocation = placeId => {
  const locations = JSON.parse(localStorage.getItem('locations')) || [];
  localStorage.setItem(
    'locations',
    JSON.stringify([...locations.filter(l => l.placeId !== placeId)]),
  );
  return { type: REMOVE_LOCATION, payload: placeId };
};

export const showDetails = placeId => {
  return { type: SHOW_DETAILS, payload: placeId };
};

export const hideDetails = () => {
  return { type: HIDE_DETAILS };
};

export const toggleAdd = () => {
  return { type: TOGGLE_ADD };
};

export const updateWeather = ({ placeId, loc }) => {
  return async dispatch => {
    const weather = await axios.get(
      `${config.apiUrl}/weather?units=metric&lat=${loc.lat}&lon=${loc.lng}`,
    );
    dispatch({
      type: UPDATE_WEATHER,
      payload: {
        placeId,
        weather: { ...weather.data },
      },
    });
  };
};
