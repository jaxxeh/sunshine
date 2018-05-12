import { TOGGLE_UNITS } from '../actions/types';

const units = (state = 'metric', action) => {
  switch (action.type) {
    case TOGGLE_UNITS:
      return state === 'metric' ? 'imperial' : 'metric';
    default:
      return state;
  }
};

export default units;
