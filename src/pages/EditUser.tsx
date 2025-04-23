import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user details
  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setRole(res.data.role);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch user details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  // Update user role
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/users/${id}`, { role });
      alert("User role updated successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update user role.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="edit-user">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="default">Default</option>
            <option value="testeur">Testeur</option>
            <option value="visiteur">Visiteur</option>
     
          </select>
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}