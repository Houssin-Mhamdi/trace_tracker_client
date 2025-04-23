import  { useState } from 'react';
import API from '../api/api';

export default function TraceFilter() {
  const [filters, setFilters] = useState<any>({
    numSerie: '', operation: '', startDate: '', endDate: ''
  });
  const [traces, setTraces] = useState([]);

  const fetchFiltered = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await API.get(`/traces?${params}`);
    setTraces(res.data);
  };

  return (
    <div>
      <h3>Filter Traces</h3>
      <input placeholder="Num Serie" onChange={e => setFilters({ ...filters, numSerie: e.target.value })} />
      <input placeholder="Operation" onChange={e => setFilters({ ...filters, operation: e.target.value })} />
      <input type="date" onChange={e => setFilters({ ...filters, startDate: e.target.value })} />
      <input type="date" onChange={e => setFilters({ ...filters, endDate: e.target.value })} />
      <button onClick={fetchFiltered}>Search</button>

      <ul>
        {traces.map((trace:any) => (
          <li key={trace._id}>{trace.numSerie} - {trace.operation} - {trace.date}</li>
        ))}
      </ul>
    </div>
  );
}
