import { 
  UsersState, 
  UsersActionTypes, 
  ADD_USER, 
  UPDATE_USER, 
  FETCH_ALL_USERS_COMMIT, 
  ADD_USER_ROLLBACK, 
  UPDATE_USER_ROLLBACK, 
  UPDATE_USER_COMMIT 
} from "../types";


const initialState: UsersState = {
  users: [],
};

export default(state = initialState, action: UsersActionTypes) => {
  switch (action.type) {
    case FETCH_ALL_USERS_COMMIT: 
      return {
        ...state,
        users: action.payload
      };
    case ADD_USER_ROLLBACK:
      return {
        ...state,
        // Remove user by id from action's meta
        users: state.users.filter(user => user.id === action.meta.id)
      }
    case ADD_USER:
      return {
        ...state,
        // Push user to the end of array
        users: [
          ...state.users,
          action.payload
        ]
      };
    case UPDATE_USER:
      return {
        ...state,
        // Update user with matching id
        users: state.users.map(user => {
          return (user.id === action.payload.id) ? 
            // Optimistically update version
            { ...action.payload, version: action.payload.version + 1 } : 
            user;
        })
      };
    case UPDATE_USER_COMMIT:
        return {
          ...state,
          // Update user with matching id with value returned from server
          users: state.users.map(user => {
            return (user.id === action.payload.id) ? 
              action.payload : 
              user;
          })
        };
    case UPDATE_USER_ROLLBACK:
      return {
        ...state,
        // Update user with previous value taken from action meta
        users: state.users.map(user => {
          return (user.id === action.meta.id) ? 
            action.meta : user;
        })
      }
    default:
      return state;
  }
};
