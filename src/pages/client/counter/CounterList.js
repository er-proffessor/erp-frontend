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
        `/api/branches/${branchId}/counters`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCounters(res.data || []);

    } catch (error) {
      console.error("Fetch counters error:", error);
      setCounters([]);

    }
  }, [branchId]);

  useEffect(() => {
    if (branchId) {
      fetchCounters();
    }
  }, [branchId, fetchCounters]);

  return (
     <div className="container-fluid">
      <h4 className="mb-3">Counter List</h4>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Counter Name</th>
            <th>Mobile Number</th>
            <th>School Name</th>
            <th>Total Books Assigned</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {counters.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No counters found
              </td>
            </tr>
          ) : (
            counters.map((counter, index) => (
              <tr key={counter._id}>
                <td>{index + 1}</td>
                <td>{counter.name}</td>
                <td>{counter.mobileNo}</td>
                <td>{counter.schoolId?.schoolName}</td>
                <td>{counter.stockCount || 0}</td>
                <td>{counter.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
 
}

export default CounterList;
