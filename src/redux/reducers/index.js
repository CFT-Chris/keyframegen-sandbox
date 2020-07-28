import { combineReducers } from 'redux';
import keyframesType from './keyframesType';
import simpleName from './simpleName';
import simpleDuration from './simpleDuration';
import sharedOptions from './sharedOptions';

export default combineReducers({
  keyframesType,
  sharedOptions,
  simpleName,
  simpleDuration
});