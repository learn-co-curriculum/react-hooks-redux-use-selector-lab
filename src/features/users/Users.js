import React from "react";
import { useSelector } from "react-redux";

function Users() {
  const users = useSelector((state) => state.users);
  const userCount = useSelector((state) => state.users.length);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
      Total Users: {userCount}
    </div>
  );
}

export default Users;
