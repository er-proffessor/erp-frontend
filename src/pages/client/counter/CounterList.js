import { useEffect, useState, useCallback } from "react";

import { useParams } from "react-router-dom";
import API from "../../../config/api";

function CounterList() {
  const [counters, setCounters] = useState([]);
  const { branchId } = useParams();

  const fetchCounters = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/api/branches/branch/${branchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCounters(res.data);
    } catch (error) {
      console.error("Fetch counters error:", error);
    }
  }, [branchId]);

  useEffect(() => {
    if (branchId) {
      fetchCounters();
    }
  }, [branchId, fetchCounters]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Counter List</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {counters.map((counter) => (
            <tr key={counter._id}>
              <td>{counter.name}</td>
              <td>{counter.status ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CounterList;
