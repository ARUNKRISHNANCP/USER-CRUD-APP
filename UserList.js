// src/components/UserList.js
import React, { useEffect, useState } from "react";
import axios from "../api";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get("/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`/users/${id}`);
    loadUsers(); // reload data
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>CRUD - Table View</h2>
      <Link to="/create" className="btn btn-primary mb-3">Create CRUD</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th><th>Phone</th><th>Email</th><th>Location</th>
            <th>View</th><th>Edit</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.phone}</td><td>{user.email}</td><td>{user.location}</td>
              <td><Link className="btn btn-warning" to={`/view/${user.id}`}>View</Link></td>
              <td><Link className="btn btn-success" to={`/edit/${user.id}`}>Edit</Link></td>
              <td><button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
