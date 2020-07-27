import { SET_TYPE } from '../actionTypes';
import { KEYFRAMES_TYPES } from '../../constants';

const initialState = Object.keys(KEYFRAMES_TYPES)[0];

const keyframesType = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPE: {
      state = action.payload.type;
      break;
    }
    default:
      break;
  }

  return(state);
}

export default keyframesType;