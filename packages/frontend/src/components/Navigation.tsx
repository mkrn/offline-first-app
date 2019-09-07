import React from 'react';
import { Navbar, NavbarGroup, Alignment, NavbarHeading, NavbarDivider, Button, Classes } from '@blueprintjs/core';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from '../actions/users';

export interface NavigationProps {
  history: History
}

const Navigation = ({ history }: NavigationProps) => {
  const dispatch = useDispatch();

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Offline-First App</NavbarHeading>
        <NavbarDivider />
        <Button 
          className={Classes.MINIMAL} 
          icon="add" 
          text="Add User" 
          onClick={() => history.push('/add')} 
        />

        <Button 
          className={Classes.MINIMAL} 
          icon="refresh" 
          text="Reload Users" 
          onClick={() => { dispatch(fetchAllUsers()); }} 
        />
      </NavbarGroup>
    </Navbar>
  );
};

export default Navigation;
