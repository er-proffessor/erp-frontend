import {useParams} from "react-router-dom";

import { useState, useEffect, useCallback } from "react";
import API from "../config/api";

function Header() {

  
  
  const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("counterId");
  localStorage.removeItem("branchId");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/";
};

  const { branchId } = useParams();
  const [branch, setBranch] = useState({});
  const role = localStorage.getItem("role");
  
  
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
  if (!branchId || role === "COUNTER") return;

  fetchBranchDetails();
}, [branchId, fetchBranchDetails, role]);



  return (
    
      <nav className="navbar navbar-light bg-white border-bottom px-4">
      <h4>  <span className="fw-bold">
  {role === "COUNTER"
    ? "Counter Dashboard"
    : branch.branchName
      ? `Welcome ${branch.branchName} Groups`
      : "Dashboard"}
</span></h4>
        <div className="ms-auto d-flex align-items-center gap-3">
          

          <button className="btn btn-outline-danger btn-sm" style={{bgcolor: "#9955ee"}} onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    
  );
}

export default Header;
