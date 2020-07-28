import { SET_SIMPLE_ACTIVE } from '../actionTypes';
import { Simple } from 'keyframegen';

const initialState = Object.keys(Simple.EffectClasses)[0];

const simpleName = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIMPLE_ACTIVE: {
      state = action.payload.name;
      break;
    }
    default:
      break;
  }

  return(state);
}

export default simpleName;