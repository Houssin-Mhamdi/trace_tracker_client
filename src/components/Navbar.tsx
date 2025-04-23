import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveLink(path);
  }, [location]);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      {isLoggedIn ? (
        <>
          <div className={styles["navbar-links"]}>
            <Link
              to="/dashboard"
              className={`${styles["navbar-link"]} ${
                activeLink === "dashboard" ? styles.active : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/create-trace"
              className={`${styles["navbar-link"]} ${
                activeLink === "create-trace" ? styles.active : ""
              }`}
            >
              Create Trace
            </Link>
            <Link
              to="/traces"
              className={`${styles["navbar-link"]} ${
                activeLink === "traces" ? styles.active : ""
              }`}
            >
              Trace Filter
            </Link>
          </div>
          <div className={styles["logout-wrapper"]}>
            <button className={styles["logout-button"]} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className={styles["navbar-links"]}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}
