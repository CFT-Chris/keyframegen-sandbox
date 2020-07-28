import { SET_TYPE, SET_SIMPLE_ACTIVE, SET_OPTIONS, ACTION_REPLAY } from './actionTypes';

export const setType = type => ({ 
  type: SET_TYPE, 
  payload: { type } 
});

export const setSimpleActive = name => ({
  type: SET_SIMPLE_ACTIVE,
  payload: { name }
});

export const setOptions = options => ({
  type: SET_OPTIONS,
  payload: { options }
});

export const replayAnimation = () => ({
  type: ACTION_REPLAY
});