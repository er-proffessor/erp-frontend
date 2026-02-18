import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import API from "../../config/api";
import { FaSchool, FaBook, FaUserTie, FaTasks } from "react-icons/fa";

const dashboardCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #ffffff, #f8fbf9)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
  transition: "all 0.25s ease",
  border: "1px solid rgba(0,0,0,0.03)",
  position: "relative",
  overflow: "hidden"
};

const chartCardStyle = {
  padding: "20px",
  borderRadius: "14px",
  background: "#ffffff",
  boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
  minHeight: "300px",
  border: "1px solid rgba(0,0,0,0.04)"
};

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
        <h5 className="fw-bold" style={{letterSpacing:"0.5px"}}>{branch.branchName
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
          <div className="dashboard-card text-center" style={{
  ...dashboardCardStyle,
  borderTop: "4px solid #4CAF50"
}}>
            <div className="d-flex align-items-center justify-content-between">
  <div>
    <h6 className="text-muted">Total Schools</h6>
    <h3 className="fw-bold text-success">10</h3>
  </div>
  <FaSchool size={28} color="#4CAF50" />
</div>

          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="dashboard-card text-center" style={{
  ...dashboardCardStyle,
  borderTop: "4px solid #2196F3"
}}>
            <div className="d-flex align-items-center justify-content-between">
  <div>
    <h6 className="text-muted">Total Books / Inventory</h6>
    <h3 className="fw-bold text-primary">110</h3>
  </div>
  <FaBook size={28} color="#2196F3" />
</div>

          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="dashboard-card text-center" style={{
  ...dashboardCardStyle,
  borderTop: "4px solid #9C27B0"
}}>
            <div className="d-flex align-items-center justify-content-between">
  <div>
    <h6 className="text-muted">Total Counter</h6>
    <h3 className="fw-bold" style={{ color: "#9C27B0" }}>10</h3>
  </div>
  <FaUserTie size={28} color="#9C27B0" />
</div>

          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="dashboard-card text-center" style={{
  ...dashboardCardStyle,
  borderTop: "4px solid #FF9800"
}}>
            <div className="d-flex align-items-center justify-content-between">
  <div>
    <h6 className="text-muted">Pending Tasks</h6>
    <h3 className="fw-bold" style={{ color: "#FF9800" }}>5</h3>
  </div>
  <FaTasks size={28} color="#FF9800" />
</div>

          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="dashboard-card" style={chartCardStyle}>
            <h6>Student By Gender</h6>
            <div className="text-center text-muted mt-4">
              (Chart will come here)
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card" style={chartCardStyle}>
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
