import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useUsers } from '../hooks/useUsers';

export function UserTable() {
  const { isLoading, error, users } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!users) return <div>No users</div>;

  return (
    <Table aria-label="User Table">
      <TableHeader>
        <TableColumn key="image">IMAGE</TableColumn>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="email">EMAIL</TableColumn>
        <TableColumn key="role">ROLE</TableColumn>
      </TableHeader>
      <TableBody items={users}>
        {(user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar name={user.name} radius="lg" size="lg" />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
