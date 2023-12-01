import React, { useState, useEffect, useRef } from "react";
import UserComponent from "../../components/UserComponent";
import {getAlluser} from "../../services/UserServices"; 
const Userstable = () => {
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAlluser();
      setUsers(response.users);
      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  return (
    <div className="table-container">
      <table aria-label="user table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? 
          <tr><td>Loading</td></tr> : 
          Users.map((user, index) => (
            <UserComponent key={index} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userstable;
