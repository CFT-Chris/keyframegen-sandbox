import { 
  ADD_COMPLEX_TRANSFORM, 
  REMOVE_COMPLEX_TRANSFORM, 
  SET_COMPLEX_TRANSFORM, 
  REORDER_COMPLEX_TRANSFORM 
} from '../actionTypes';
import { Complex } from 'keyframegen';

const defaultComponent = {
  type: 'scale'
};

const initialState = {
  data: [],
  warning: null,
  serialization: []
};

const complexTransforms = (state = initialState, action) => {
  let serialize = true;

  state = {
    data: state.data,
    warning: null,
    serialization: state.serialization
  };

  switch (action.type) {
    case ADD_COMPLEX_TRANSFORM: {
      if (action.payload.preset) {
        state.data = [
          ...state.data,
          ...action.payload.preset
        ];
      }
      else {
        state.data = [
          ...state.data,
          {...defaultComponent}
        ];
      }

      break;
    }
    case REMOVE_COMPLEX_TRANSFORM: {
      const from = action.payload.from;
      const to = action.payload.to || from;

      if (action.payload.all) {
        state.data = [];
      }
      else if (state.data[from] && state.data[to] && from <= to) {
        state.data = [
          ...state.data.slice(0, from),
          ...state.data.slice(to + 1)
        ];
      }
      else
        state.warning = 'Index out of range';

      break;
    }
    case SET_COMPLEX_TRANSFORM: {
      const index = 'index' in action.payload
        ? action.payload.index
        : state.data.length - 1;
      
      if (!action.payload.options)
        state.warning = 'No ComponentOptions object provided';
      else if (state.data[index]) {
        state.data = [
          ...state.data.slice(0, index),
          action.payload.options,
          ...state.data.slice(index + 1)
        ]
      }
      else
        state.warning = 'Index out of range';

      break;
    }
    case REORDER_COMPLEX_TRANSFORM: {
      const from = Math.max(0, action.payload.from);
      const to = Math.min(state.data.length - 1, action.payload.to);

      state.data.splice(to, 0, state.data.splice(from, 1)[0]);

      break;
    }
    default:
      serialize = false;
      break;
  }

  if (serialize && !state.warning) {
    const complexKeyframes = new Complex();

    state.data.forEach(component => {
      complexKeyframes[component.type](component);
    });

    state.serialization = complexKeyframes.serialize();
  }
  else if (state.warning)
    console.warn(state.warning);

  return(state);
}

export default complexTransforms;