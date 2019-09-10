import React from "react";
import { User } from "../types";
import { Cell, Table, Column } from "@blueprintjs/table";
import { Link } from "react-router-dom";

interface UsersGridProps {
  users: User[];
}

const UsersGrid = ({ users }: UsersGridProps) => {
  const nameRenderer = (rowIndex: number) => {
    const { id, name } = users[rowIndex];
    return (
      <Cell>
        <Link to={`/view/${id}`}>{name}</Link>
      </Cell>
    );
  };

  const emailRenderer = (rowIndex: number) => {
    return <Cell>{users[rowIndex].email}</Cell>;
  };

  const avatarRenderer = (rowIndex: number) => {
    return <Cell>{users[rowIndex].avatar}</Cell>;
  };

  return (
    <Table numRows={users.length}>
      <Column name="Name" cellRenderer={nameRenderer} />
      <Column name="Email" cellRenderer={emailRenderer} />
      <Column name="Avatar" cellRenderer={avatarRenderer} />
    </Table>
  );
};

export default UsersGrid;
