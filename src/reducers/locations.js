import {
  ADD_LOCATION,
  REMOVE_LOCATION,
  SHOW_DETAILS,
  HIDE_DETAILS,
  UPDATE_WEATHER,
  LOAD_LOCATIONS,
} from '../actions/types';

const locations = (state = [], action) => {
  let locations;
  switch (action.type) {
    case ADD_LOCATION:
      if (action.payload.isCurrent) {
        return [action.payload, ...state];
      } else {
        return [...state, action.payload];
      }
    case REMOVE_LOCATION:
      return state.filter(l => l.placeId !== action.payload);
    case SHOW_DETAILS:
      locations = [...state];
      locations.find(l => l.placeId === action.payload).isSelected = true;
      return locations;
    case HIDE_DETAILS:
      locations = [...state];
      locations.find(l => l.isSelected).isSelected = false;
      return locations;
    case UPDATE_WEATHER:
      locations = [...state];
      locations.find(l => l.placeId === action.payload.placeId).weather =
        action.payload.weather;
      return locations;
    case LOAD_LOCATIONS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default locations;
