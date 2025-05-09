import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateTrace() {
  const [trace, setTrace] = useState({
    numSerie: "",
    operation: "",
    trace: "",
    date: "",
  });
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/traces", trace);
      alert("Trace created successfully!");
      setTrace({ numSerie: "", operation: "", trace: "", date: "" }); // Reset form
      navigate("/traces");
    } catch (err) {
      console.error(err);
      alert("Failed to create trace");
    }
  };

  return (
    <div className="create-trace">
      <h2>Create Trace</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Num Série:
          <input
            type="text"
            value={trace.numSerie}
            onChange={(e) => setTrace({ ...trace, numSerie: e.target.value })}
            required
          />
        </label>
        <label>
          Operation:
          <input
            type="text"
            value={trace.operation}
            onChange={(e) => setTrace({ ...trace, operation: e.target.value })}
            required
          />
        </label>
        <label>
          Trace:
          <input
            type="text"
            value={trace.trace}
            onChange={(e) => setTrace({ ...trace, trace: e.target.value })}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={trace.date}
            onChange={(e) => setTrace({ ...trace, date: e.target.value })}
            required
          />
        </label>
        <button type="submit">Create Trace</button>
      </form>
      
    </div>
  );
}
