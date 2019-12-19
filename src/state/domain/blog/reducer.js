import { LOADING_STATUS } from '../../loadingStatus';
import { actionTypes } from './action';

const initialState = {
  data: {},
  loading: LOADING_STATUS.INITIAL,
  error: void 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getPosts: {
      return {
        ...initialState,
        loading: LOADING_STATUS.PENDING,
      };
    }
    case actionTypes.getPostsSuccess: {
      return {
        ...state,
        loading: LOADING_STATUS.SUCCESS,
        data: action.payload,
      };
    }
    case actionTypes.getPostsError: {
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
