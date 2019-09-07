export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const FETCH_ALL_USERS_COMMIT = 'FETCH_ALL_USERS_COMMIT'
export const ADD_USER_ROLLBACK = 'ADD_USER_ROLLBACK'
export const UPDATE_USER_ROLLBACK = 'UPDATE_USER_ROLLBACK'
export const UPDATE_USER_COMMIT = 'UPDATE_USER_COMMIT'

export interface UserInput {
  name: string
  email: string
  avatar?: string
}

export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    version: number
}

interface OfflineMeta {
  effect: {
    url: string,
    method?: string,
    json?: User
  },
  commit?: {
    type: string,
    meta?: any
  },
  rollback?: {
    type: string,
    meta?: any
  }
}

interface AddUserAction {
    type: typeof ADD_USER
    payload: User,
    meta: {
      offline: OfflineMeta
    }
}

interface UpdateUserAction {
    type: typeof UPDATE_USER
    payload: User,
    meta: {
      offline: OfflineMeta
    }
}

interface FetchAllUsersAction {
  type: typeof FETCH_ALL_USERS
  meta: {
    offline: OfflineMeta
  }
}

interface FetchAllUsersCommitAction {
  type: typeof FETCH_ALL_USERS_COMMIT
  payload: [User]
}

interface AddUserRollbackAction {
  type: typeof ADD_USER_ROLLBACK
  meta: {
    id: string
  }
}

interface UpdateUserRollbackAction {
  type: typeof UPDATE_USER_ROLLBACK
  meta: User
}

interface UpdateUserCommitAction {
  type: typeof UPDATE_USER_COMMIT
  payload: User
}

// TODO: implement to visualize sync status
// export interface SyncStatuses {
//   [index: string]: boolean
// }

export interface UsersState {
    users: User[]
    // syncStatus: SyncStatuses
}

export type UsersActionTypes = FetchAllUsersAction | AddUserAction | 
  UpdateUserAction | FetchAllUsersCommitAction | AddUserRollbackAction |
  UpdateUserRollbackAction | UpdateUserCommitAction