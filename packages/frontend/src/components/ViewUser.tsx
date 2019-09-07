import React from 'react';
import { NonIdealState } from '@blueprintjs/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../reducers';
import UserForm from './UserForm';
import { updateUser } from '../actions/users';
import { UserInput, User } from '../types';
 
interface ViewUserProps {
  id: string,
  afterSubmit: () => void
};

// selector to get user by id from state
// TODO: separate selectors to a file. Use reselect
const userByIdSelector = (id: string) => (state: AppState) => {
  return state.users.users.find((user: User) => user.id === id);
}

const ViewUser = (props: ViewUserProps) => {
  const user = useSelector(userByIdSelector(props.id));
  const dispatch = useDispatch();

  if (!user) {
    return (
      <NonIdealState icon="error" title="User not Found" />
    );
  } else {
    const onSubmit = (userInput: UserInput) => {
      dispatch(updateUser({ ...user, ...userInput }, user));
      props.afterSubmit();
    }

    return (
      <UserForm 
        user={user} 
        onSubmit={onSubmit} 
        buttonTitle="UpdateUser" 
        buttonIcon="cloud-upload" 
      />
    )
  }
}
 
export default ViewUser;
