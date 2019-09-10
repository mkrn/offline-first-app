import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../actions/users";
import { Switch, Route, RouteComponentProps } from "react-router";
import Navigation from "./Navigation";
import ViewUser from "./ViewUser";
import AddUser from "./AddUser";
import PanelWrapper from "./PanelWrapper";
import { usersFromState } from "../selectors";
import UsersGrid from "./UsersGrid";

const Users = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = () => {
      dispatch(fetchAllUsers());
    };

    // Get all users on component mount
    fetchUsers();

    // Subscribe to online event to refetch when we go online
    window.addEventListener("online", fetchUsers);

    return () => {
      window.removeEventListener("online", fetchUsers);
    };
  }, [dispatch]);

  const users = useSelector(usersFromState);

  return (
    <div>
      <Navigation history={history} />

      <UsersGrid users={users} />

      <Switch>
        <Route
          path="/add"
          component={(props: RouteComponentProps) => (
            <PanelWrapper title="Add User" {...props}>
              <AddUser
                afterSubmit={() => {
                  history.push("/");
                }}
              />
            </PanelWrapper>
          )}
        />
        <Route
          path="/view/:id"
          component={(props: RouteComponentProps) => (
            <PanelWrapper title="View User" {...props}>
              <ViewUser
                id={(props.match.params as any).id}
                afterSubmit={() => {
                  history.push("/");
                }}
              />
            </PanelWrapper>
          )}
        />
      </Switch>
    </div>
  );
};

export default Users;
