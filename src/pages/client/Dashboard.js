import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
import API from "../../config/api";

function Dashboard() {
  const { branchId } = useParams();
  const [branch, setBranch] = useState({});

  const fetchBranchDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        `/api/branches/${branchId}/branch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBranch(response.data.data);
    } catch (error) {
      console.error("Branch fetch error:", error);
    }
  }, [branchId]);

  useEffect(() => {
    if (branchId) {
      fetchBranchDetails();
    }
  }, [branchId, fetchBranchDetails]);

  return (
    <div className="dashboard-page">
      <div className="mb-4">
        <h5 className="fw-bold">{branch.branchName
            ? `${branch.branchName}`
            : "Dashboard"}</h5>
        <small className="text-muted">
          {branch.branchName
            ? `${branch.branchName} / Dashboard`
            : "Dashboard"}
        </small>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Students</h6>
            <h4 className="text-success">11</h4>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Staff</h6>
            <h4 className="text-success">1</h4>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Parents</h6>
            <h4 className="text-success">4</h4>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card shadow-sm text-center p-3">
            <h6>Pending Complaints</h6>
            <h4 className="text-warning">4</h4>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm" style={{ minHeight: "300px" }}>
            <h6>Student By Gender</h6>
            <div className="text-center text-muted mt-4">
              (Chart will come here)
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm" style={{ minHeight: "300px" }}>
            <h6>Students</h6>
            <div className="text-center text-muted mt-4">
              (Chart will come here)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
