import { 
  SET_TYPE, 
  SET_SIMPLE_ACTIVE, 
  SET_OPTIONS, 
  ACTION_REPLAY, 
  ADD_COMPLEX_TRANSFORM, 
  REMOVE_COMPLEX_TRANSFORM, 
  SET_COMPLEX_TRANSFORM,
  REORDER_COMPLEX_TRANSFORM
} from './actionTypes';

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

export const addTransform = (preset) => ({
  type: ADD_COMPLEX_TRANSFORM,
  payload: { preset }
});

export const removeTransform = ({ from, to, all }) => ({
  type: REMOVE_COMPLEX_TRANSFORM,
  payload: { from, to, all }
});

export const setTransform = (options, index) => ({
  type: SET_COMPLEX_TRANSFORM,
  payload: { options, index }
});

export const reorderTransform = (from, to) => ({
  type: REORDER_COMPLEX_TRANSFORM,
  payload: { from, to }
});
