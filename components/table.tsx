import React from 'react';
import { Table, Spinner } from 'evergreen-ui'

const UserList = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setUsers(json);
      });
  }, [])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Email Address</Table.TextHeaderCell>
        <Table.TextHeaderCell>Phone Number</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={240}>
        {users.map((profile) => (
          <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
            <Table.TextCell>{profile.name}</Table.TextCell>
            <Table.TextCell>{profile.email}</Table.TextCell>
            <Table.TextCell isNumber>{profile.phone}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default UserList;
