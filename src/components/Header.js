import {useParams} from "react-router-dom";

import { useState, useEffect, useCallback } from "react";
import API from "../config/api";

function Header() {

  
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";

    // localStorage.clear();
    // navigate("/");

  };

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
    
      <nav className="navbar navbar-light bg-white border-bottom px-4">
      <h4>  <span className="fw-bold">{branch.branchName
            ? `Welcome ${branch.branchName} Groups`
            : "Dashboard"}</span></h4>
        <div className="ms-auto d-flex align-items-center gap-3">
          

          <button className="btn btn-outline-danger btn-sm" style={{bgcolor: "#9955ee"}} onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    
  );
}

export default Header;
