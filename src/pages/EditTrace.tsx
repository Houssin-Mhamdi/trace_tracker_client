import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function EditTrace() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trace, setTrace] = useState({
    numSerie: "",
    operation: "",
    traceDesc: "",
    date: "",
  });
  console.log("trace", trace);
  // Fetch trace details
  const fetchTrace = async () => {
    try {
      const res = await API.get(`/traces/${id}`);
      setTrace(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch trace details");
    }
  };

  useEffect(() => {
    fetchTrace();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/traces/${id}`, trace);
      alert("Trace updated successfully!");
      navigate("/traces");
    } catch (err) {
      console.error(err);
      alert("Failed to update trace");
    }
  };

  return (
    <div className="edit-trace">
      <h2>Edit Trace</h2>
      <form onSubmit={handleSubmit}>
        {trace?.numSerie && (
          <label>
            Num Série:
            <input
              type="text"
              value={trace?.numSerie}
              onChange={(e) => setTrace({ ...trace, numSerie: e.target.value })}
              required
            />
          </label>
        )}
        {trace?.operation && (
          <label>
            Operation:
            <input
              type="text"
              value={trace?.operation}
              onChange={(e) =>
                setTrace({ ...trace, operation: e.target.value })
              }
              required
            />
          </label>
        )}

        <label>
          Trace:
          <input
            type="text"
            value={trace?.traceDesc}
            onChange={(e) => setTrace({ ...trace, traceDesc: e.target.value })}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={trace?.date?.split("T")[0]} // Format date for input field
            onChange={(e) => setTrace({ ...trace, date: e.target.value })}
            required
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
