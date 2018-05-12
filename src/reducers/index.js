import { combineReducers } from 'redux';
import locations from './locations';
import units from './units';
import dialogs from './dialogs';

const weatherApp = combineReducers({
  dialogs,
  locations,
  units,
});

export default weatherApp;
