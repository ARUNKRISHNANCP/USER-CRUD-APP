// src/components/UserView.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';

function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    api.get(`/users/${id}`).then(res => setUser(res.data));
  }, [id]);

  return (
    <div>
      <h3>User Detail</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <Link to="/" className="btn btn-secondary">Back</Link>
    </div>
  );
}

export default UserView;
