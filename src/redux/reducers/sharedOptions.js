import { SET_OPTIONS, ACTION_REPLAY } from '../actionTypes';

const initialState = { loop: false, replays: 0 };

const sharedOptions = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REPLAY: {
      state = {
        ...state,
        replays: state.replays + 1
      };
      
      break;
    }
    case SET_OPTIONS: {
      state = {
        ...state,
        ...action.payload.options
      };

      break;
    }
    default:
      break;
  }

  return(state);
}

export default sharedOptions;