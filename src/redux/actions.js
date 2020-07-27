import { SET_TYPE } from './actionTypes';

export const setType = type => ({ 
  type: SET_TYPE, 
  payload: { type } 
});