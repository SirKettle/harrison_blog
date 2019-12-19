import { LOADING_STATUS } from '../../loadingStatus';
import { actionTypes } from './action';

const initialState = {
  data: {},
  loading: LOADING_STATUS.INITIAL,
  error: void 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getConfig: {
      return {
        ...initialState,
        loading: LOADING_STATUS.PENDING,
      };
    }
    case actionTypes.getConfigSuccess: {
      return {
        ...state,
        loading: LOADING_STATUS.SUCCESS,
        data: action.payload,
      };
    }
    case actionTypes.getConfigError: {
      return {
        ...state,
        loading: LOADING_STATUS.ERROR,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
