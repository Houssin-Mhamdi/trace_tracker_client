import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/FilteredTraces.module.css";

export default function CreateOperation() {
  const [traces, setTraces] = useState<any[]>([]);

  const [filters, setFilters] = useState({
    numSerie: "",
    operation: "",
    traceDesc: "",
    startDate: "",
    endDate: "",
  });
  const [trace, setTrace] = useState({
    operation: "",
  });
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/traces", trace);
      alert("Trace created successfully!");
      setTrace({ operation: "" }); // Reset form
      fetchTraces();
    } catch (err) {
      console.error(err);
      alert("Failed to create trace");
    }
  };
  const fetchTraces = async () => {
    try {
      const res = await API.get("/traces", { params: filters });
      setTraces(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch traces");
    }
  };
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchTraces();
    }, 500); // Wait 500ms after the user stops typing

    return () => clearTimeout(debounceTimer); // Clear the timer on unmount or filter change
  }, [filters]);
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this trace?")) {
      try {
        await API.delete(`/traces/${id}`);
        alert("Trace deleted successfully!");
        fetchTraces(); // Refresh the list after deletion
      } catch (err) {
        console.error(err);
        alert("Failed to delete trace");
      }
    }
  };

  let isAdmin = null;

  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      isAdmin = JSON.parse(userData);
    }
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
  }

  return (
    <div className="create-trace">
      <h2>Create Trace</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Operation:
          <input
            type="text"
            value={trace.operation}
            onChange={(e) => setTrace({ ...trace, operation: e.target.value })}
            required
          />
        </label>

        <button type="submit">Create Trace</button>
      </form>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Num Série</th>
            <th>Operation</th>
            <th>Trace</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {traces?.length == 0 ? (
            <tr>
              <td colSpan={4}>No traces found</td>
            </tr>
          ) : (
            traces.map((trace) => (
              <tr key={trace._id}>
                <td>{trace.numSerie}</td>
                <td>{trace.operation}</td>
                <td>{trace?.traceDesc}</td>
                <td>{new Date(trace.date).toLocaleDateString()}</td>
                {(isAdmin?.role === "testeur" || isAdmin?.role === "admin") && (
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/edit-trace/${trace._id}`}>
                        <button
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => handleDelete(trace._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
