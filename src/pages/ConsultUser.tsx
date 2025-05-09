import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function ConsultUser() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);

  // Fetch user details
  const fetchUser = async () => {
    const res = await API.get(`/users/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="consult-user">
      <h2>User Details</h2>
      <div>
        <p><strong>Id:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}