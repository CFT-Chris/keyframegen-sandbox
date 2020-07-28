import { SET_OPTIONS } from '../actionTypes';

const initialState = 1000;

const simpleDuration = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPTIONS: {
      state = action.payload.options.duration || state;
      break;
    }
    default:
      break;
  }

  return(state);
}

export default simpleDuration;