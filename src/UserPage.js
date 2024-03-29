import React from 'react';

function UsersPage({ users }) {
  return (
    <div>
      <h1>Shared Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
