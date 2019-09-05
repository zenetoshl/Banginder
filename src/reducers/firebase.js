import ActionType from '../constants/actionTypes';

const initialState = {
  user: null,
};

export default function firebase(state = initialState, action) {
  switch (action.type) {
    case ActionType.FIREBASE.UPDATE_USER:
      return {
        ...state,
        user: action.data,
      };
    default:
  }
  return state;
}
