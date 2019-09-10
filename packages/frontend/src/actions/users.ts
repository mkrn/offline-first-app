import { v4 as generateUid } from "uuid";

import {
  User,
  UserInput,
  UsersActionTypes,
  ADD_USER,
  UPDATE_USER,
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_COMMIT,
  ADD_USER_ROLLBACK,
  UPDATE_USER_ROLLBACK,
  UPDATE_USER_COMMIT
} from "../types";

const ROOT_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const fetchAllUsers = (): UsersActionTypes => {
  return {
    type: FETCH_ALL_USERS,
    meta: {
      offline: {
        effect: { url: `${ROOT_URL}/user` },
        commit: { type: FETCH_ALL_USERS_COMMIT }
      }
    }
  };
};

export const addUser = (user: UserInput): UsersActionTypes => {
  const id = generateUid();
  const payload = {
    id,
    version: 1,
    ...user
  };
  return {
    type: ADD_USER,
    payload,
    meta: {
      offline: {
        effect: {
          url: `${ROOT_URL}/user`,
          method: "POST",
          json: payload
        },
        rollback: { type: ADD_USER_ROLLBACK, meta: { id: payload.id } }
      }
    }
  };
};

export const updateUser = (user: User, beforeEdit?: User): UsersActionTypes => {
  return {
    type: UPDATE_USER,
    payload: user,
    meta: {
      offline: {
        effect: {
          url: `${ROOT_URL}/user/${user.id}`,
          method: "POST",
          json: user
        },
        commit: { type: UPDATE_USER_COMMIT },
        rollback: { type: UPDATE_USER_ROLLBACK, meta: beforeEdit }
      }
    }
  };
};
