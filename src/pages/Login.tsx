import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import styles from "../styles/Form.module.css";
import sagemCom from "../assets/images.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("data", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={sagemCom} alt="" />
      </div>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email-address"
          placeholder="ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <h3>admin:aze@f.ff / password:azerty123</h3>
    </>
  );
}
