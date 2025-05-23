import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import styles from '../styles/Form.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name,setName] = useState('');
  const [surname,setSurName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser({ email, password,name,surname });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <h2>Register</h2>
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
      <input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="surname"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurName(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}