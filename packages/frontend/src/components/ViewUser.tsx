import React from "react";
import { NonIdealState } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "./UserForm";
import { updateUser } from "../actions/users";
import { UserInput } from "../types";
import { userByIdSelector } from "../selectors";

interface ViewUserProps {
  id: string;
  afterSubmit: () => void;
}

const ViewUser = (props: ViewUserProps) => {
  const user = useSelector(userByIdSelector(props.id));
  const dispatch = useDispatch();

  if (!user) {
    return <NonIdealState icon="error" title="User not Found" />;
  } else {
    const onSubmit = (userInput: UserInput) => {
      dispatch(updateUser({ ...user, ...userInput }, user));
      props.afterSubmit();
    };

    return (
      <UserForm
        user={user}
        onSubmit={onSubmit}
        buttonTitle="UpdateUser"
        buttonIcon="cloud-upload"
      />
    );
  }
};

export default ViewUser;
