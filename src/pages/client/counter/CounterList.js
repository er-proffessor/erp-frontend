import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CounterList() {
  const [counters, setCounters] = useState([]);
  const navigate = useNavigate();
  const {branchId} = useParams();

  const fetchCounters = async () => {
    const token = localStorage.getItem("token");
    console.log(branchId);

    const res = await axios.get(
      `http://localhost:5000/api/branches/branch/${branchId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCounters(res.data);
  };

  useEffect(() => {
    fetchCounters();
  }, [branchId]);

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
