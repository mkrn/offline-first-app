import users from './users';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    users
});
export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>