import React, { useEffect } from 'react';
import { AppState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers } from '../actions/users';
import { Table, Column, Cell } from '@blueprintjs/table';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Navigation from './Navigation'
import ViewUser from './ViewUser';
import AddUser from './AddUser';
import PanelWrapper from './PanelWrapper';

const usersFromState = (state: AppState) => state.users.users;


const Users = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();

  const fetchUsers = () => {
    dispatch(fetchAllUsers());
  };

  useEffect(() => {
    // Get all users on component mount
    fetchUsers();

    // Subscribe to online event to refetch when we go online
    window.addEventListener("online", fetchUsers);

    return () => {
      window.removeEventListener("online", fetchUsers);
    };
  }, [])

  const users = useSelector(usersFromState);

  const nameRenderer = (rowIndex: number) => {
    const { id, name } = users[rowIndex];
    return <Cell><Link to={`/view/${id}`}>{name}</Link></Cell>
  };

  const emailRenderer = (rowIndex: number) => {
    return <Cell>{users[rowIndex].email}</Cell>
  };

  const avatarRenderer = (rowIndex: number) => {
    return <Cell>{users[rowIndex].avatar}</Cell>
  };

  return (
    <div>
      <Navigation history={history} />

      <Table numRows={users.length}>
        <Column name="Name" cellRenderer={nameRenderer} />
        <Column name="Email" cellRenderer={emailRenderer} />
        <Column name="Avatar" cellRenderer={avatarRenderer} />
      </Table>

      <Switch>
        <Route 
          path='/add' 
          component={(props: RouteComponentProps) => (
            <PanelWrapper title="Add User" {...props}>
              <AddUser afterSubmit={() => { history.push('/'); }} />
            </PanelWrapper>
          )} 
        />
        <Route 
          path='/view/:id' 
          component={(props: RouteComponentProps) => (
            <PanelWrapper title="View User" {...props}>
              <ViewUser 
                id={(props.match.params as any).id} 
                afterSubmit={() => { history.push('/'); }}
              />
            </PanelWrapper>
          )} 
        />
      </Switch>

    </div>
  );
}

export default Users;
