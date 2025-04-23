import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import styles from "../styles/FilteredTraces.module.css";

export default function FilteredTraces() {
  const [traces, setTraces] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    numSerie: "",
    operation: "",
    trace: "",
    startDate: "",
    endDate: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Fetch filtered traces
  const fetchTraces = async () => {
    try {
      const res = await API.get("/traces", { params: filters });
      setTraces(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch traces");
    }
  };

  // Debounced API calls for real-time filtering
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchTraces();
    }, 500); // Wait 500ms after the user stops typing

    return () => clearTimeout(debounceTimer); // Clear the timer on unmount or filter change
  }, [filters]);

  // Delete a trace
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

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/traces/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
      alert("Excel file imported successfully!");
      setFile(null); // Reset file input
      fetchTraces(); // Refresh the list after import
    } catch (err) {
      console.error(err);
      setMessage("Failed to import Excel file");
      alert("Failed to import Excel file");
    }
  };

  return (
    <div className={styles["filtered-traces"]}>
      <h2>Filtered Traces</h2>

      {/* Filters */}
      <form>
        <label>
          Num Série:
          <input
            type="text"
            value={filters.numSerie}
            onChange={(e) =>
              setFilters({ ...filters, numSerie: e.target.value })
            }
          />
        </label>
        <label>
          Operation:
          <input
            type="text"
            value={filters.operation}
            onChange={(e) =>
              setFilters({ ...filters, operation: e.target.value })
            }
          />
        </label>
        <label>
          Trace:
          <input
            type="text"
            value={filters.trace}
            onChange={(e) =>
              setFilters({ ...filters, trace: e.target.value })
            }
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </label>
      </form>

      {/* File Upload */}
      <div className={styles["import-excel"]}>
        <h2>Import Excel File</h2>
        <form className={styles["upload-form"]} onSubmit={handleSubmit}>
          <label>
            Select Excel File:
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
      </div>

      {/* Trace Table */}
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
                <td>{trace.trace}</td>
                <td>{new Date(trace.date).toLocaleDateString()}</td>
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
