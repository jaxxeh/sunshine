import {
  TOGGLE_ADD,
  SHOW_DETAILS,
  HIDE_DETAILS,
  REMOVE_LOCATION,
} from '../actions/types';

const dialogs = (state = { add: false, details: false }, action) => {
  switch (action.type) {
    case TOGGLE_ADD:
      return { ...state, add: !state.add };
    case REMOVE_LOCATION:
    case HIDE_DETAILS:
      return { ...state, details: false };
    case SHOW_DETAILS:
      return { ...state, details: true };
    default:
      return state;
  }
};

export default dialogs;
