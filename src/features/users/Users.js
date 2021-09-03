import React from "react";
// add any needed imports here
import { useSelector } from "react-redux";

function Users() {
  const users=useSelector((state)=>state.users);
  const userCounter = useSelector((state)=> state.users.length);
  return (
    <div>
      <ul>
      {users.map((user) => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
      Total Users: {userCounter};
    </div>
  );
}

export default Users;
