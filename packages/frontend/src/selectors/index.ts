import { AppState } from "../reducers";
import { User } from "../types";

// Get all users
export const usersFromState = (state: AppState) => state.users.users;

// Get user by id from state
export const userByIdSelector = (id: string) => (state: AppState) => {
  return state.users.users.find((user: User) => user.id === id);
};
