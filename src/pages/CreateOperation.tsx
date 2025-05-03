import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateOperation() {
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
    </div>
  );
}
