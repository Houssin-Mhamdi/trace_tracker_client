import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import styles from "../styles/Dashboard.module.css";
export default function Dashboard() {
  const [users, setUsers] = useState<any>([]);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const deleteUser = async (id: any) => {
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const userStored = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className={styles.dashboard}>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div className="flex justify-between items-center gap-3">
                  {userStored?.role === "admin" && (
                    <button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  )}
                  {userStored?.role === "admin" && (
                    <button
                      style={{ backgroundColor: "blue", color: "white" }}
                      onClick={() => navigate(`/edit/${user._id}`)}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => navigate(`/consult/${user._id}`)}
                  >
                    Consulting
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
