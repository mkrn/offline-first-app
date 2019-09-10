import React from "react";
import { addUser } from "../actions/users";
import UserForm from "./UserForm";
import { useDispatch } from "react-redux";
import { UserInput } from "../types";

interface AddUserProps {
  afterSubmit: () => void;
}

const AddUser = (props: AddUserProps) => {
  const dispatch = useDispatch();

  const onSubmit = (userInput: UserInput) => {
    dispatch(addUser(userInput));
    props.afterSubmit();
  };

  return (
    <UserForm onSubmit={onSubmit} buttonIcon="add" buttonTitle="Add User" />
  );
};

export default AddUser;
