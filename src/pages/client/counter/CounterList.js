import { useEffect, useState, useCallback } from "react";

import { useParams, useNavigate, NavLink } from "react-router-dom";
import API from "../../../config/api";

function CounterList() {
  const [counters, setCounters] = useState([]);
  const { branchId } = useParams();
  const navigate = useNavigate();

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
      console.log(res);
      
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

  
  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };


  const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are You sure want to delete this Counter?");
      if(!confirmDelete) return;

      try{
        const token = localStorage.getItem("token");

        await API.delete(`/api/branches/${id}`,
         {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
         } 
        );
        alert("Counter Deleted Successfully");
        fetchCounters();

      }
      catch (error) {
          alert("Delete Failed");
      }
  };


  return (
     <div className="container-fluid">
      {/* <h4 className="mb-3">Counter List</h4> */}
      <div className="card-header d-flex justify-content-between">
        <h5>Counter List</h5>
        <NavLink to={`/branches/${branchId}/counters/add`} className="btn btn-primary btn-sm">
          + Add Counter
        </NavLink>
      </div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Counter Name</th>
            <th>Mobile Number</th>
            <th>School Name</th>
            <th>Total Books Assigned</th>
            <th>Status</th>
            <th>Counter Dashboard</th>
            <th>Action</th>
            
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
                <td>{counter.totalBooksAssigned || 0}</td>
                <td>{counter.status}</td>
              
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => {
                    localStorage.setItem("counterId", counter._id);
                    navigate(`/branches/${branchId}/counter-dashboard`);
                  }}
                  >
                  Open
                  </button>
                </td>
                
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>handleEdit(counter._id)}>✏️</button>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(counter._id)}>🗑</button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
 
}

export default CounterList;
