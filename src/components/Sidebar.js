import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import API from "../config/api";

import {
  FaSchool,
  FaBook,
  FaHome,
  FaUsers,
  FaBoxes,
  FaChevronDown,
  FaChevronUp,
   FaPlusCircle,
  FaList,
  
} from "react-icons/fa";

function Sidebar() {
  const { branchId } = useParams();

  const [school, setSchool] = useState(false);
  const [books, setBooks] = useState(false);
  const [counter, setCounter] = useState(false);
  const [branch, setBranch] = useState({});
  // const [inventory, setInventory] = useState(false);

  const toggleSchool = () => {
    setSchool(!school);
    setBooks(false);
    setCounter(false);
  };

  const toggleBooks = () => {
    setBooks(!books);
    setSchool(false);
    setCounter(false);
  };

  const toggleCounter = () => {
    setCounter(!counter);
    setBooks(false);
    setSchool(false);
  };

  const fetchBranchDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(`/api/branches/${branchId}/branch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranch(response.data.data);
    } catch (error) {
      console.error("Branch fetch error:", error);
    }
  }, [branchId]);

  useEffect(() => {
    if (branchId) fetchBranchDetails();
  }, [branchId, fetchBranchDetails]);

  return (
    <div className="sidebar"
      style={{
        width: "260px",
        height: "100vh",
        overflowY: "auto",
        background: "linear-gradient(to bottom, #f1b1d0, #dbb696)",
        boxShadow: "4px 0 10px rgba(130, 67, 67, 0.05)",
        padding: "20px",
        transition: "all 0.3s ease"
      }}
    >
      {/* <h4 style={{ fontWeight: "700", marginBottom: "20px", color: "#2e7d32" }}> */}
      <h3 style={titleStyle}>
        {branch.branchName ? branch.branchName : "Dashboard"}
      </h3>

      <ul className="nav flex-column">

        {/* DASHBOARD */}
        <li className="nav-item mb-2">
          <NavLink
            to={`/branches/${branchId}`}
            style={navStyle}
          >
            <FaHome /> Dashboard
          </NavLink>
        </li>

        {/* SCHOOL */}
        <li className="nav-item mb-2">
          <div onClick={toggleSchool}  className="menu-hover" style={menuStyle}>
            <FaSchool /> School {school ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          <div style={dropdownStyle(school)}>
            <NavLink to={`/branches/${branchId}/schools`} style={subNavStyle}>
              <FaList />School List
            </NavLink>
            <NavLink to={`/branches/${branchId}/schools/add`} style={subNavStyle}>
              <FaPlusCircle />Add School
            </NavLink>
          </div>
        </li>

        {/* BOOKS */}
        <li className="nav-item mb-2">
          <div onClick={toggleBooks}  className="menu-hover" style={menuStyle}>
            <FaBook /> Books {books ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          <div style={dropdownStyle(books)}>
            <NavLink to={`/branches/${branchId}/books`} style={subNavStyle}>
              <FaList />Books List
            </NavLink>
            <NavLink to={`/branches/${branchId}/books/add`} style={subNavStyle}>
              <FaPlusCircle />Add Books
            </NavLink>
          </div>
        </li>

        {/* COUNTERS */}
        <li className="nav-item mb-2">
          <div onClick={toggleCounter}  className="menu-hover"style={menuStyle}>
            <FaUsers /> Counters {counter ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          <div style={dropdownStyle(counter)}>
            <NavLink to={`/branches/${branchId}/counters`} style={subNavStyle}>
              <FaList />Counters List
            </NavLink>
            <NavLink to={`/branches/${branchId}/counters/add`} style={subNavStyle}>
              <FaPlusCircle />Add Counter
            </NavLink>
            <NavLink to={`/branches/${branchId}/counter-stock/assign`} style={subNavStyle}>
              <FaBoxes />Assign Books
            </NavLink>
          </div>
        </li>

        {/* INVENTORY
        <li className="nav-item mt-2">
          <div  className="menu-hover"style={menuStyle}>
          <NavLink to={`/branches/${branchId}/inventory`} style={navStyle}>
            <FaWarehouse /> Inventory 
          </NavLink>
          </div>
        </li> */}

      </ul>
    </div>
  );
}

const navStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  borderRadius: "8px",
  textDecoration: "none",
  color: isActive ? "#2da05f" : "#333",
  background: isActive ? "rgba(76, 175, 80, 0.12)" : "transparent",
  borderLeft: isActive ? "4px solid #4CAF50" : "4px solid transparent",
  boxShadow: isActive ? "0 4px 12px rgba(76,175,80,0.2)" : "none",
  fontWeight: isActive ? "bold" : "500",
  fontSize: isActive ? "21px" : "20px",
  transition: "all 0.2s ease"
});

const menuStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  cursor: "pointer",
  borderRadius: "8px",
   fontSize: "20px",   // 🔥 change here anytime
  fontWeight: "700",
  transition: "0.2s",
};

const subNavStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px", 
  padding: "8px 20px",
  marginTop: "5px",
  borderRadius: "6px",
  textDecoration: "none",
  color: isActive ? "#2e7d32" : "#555",
  background: isActive ? "#e8f5e9" : "transparent",
  borderLeft: isActive ? "3px solid #4CAF50" : "3px solid transparent",
  fontWeight: isActive ? "bold" : "500",
  fontSize: isActive ? "16px" : "15px",
  transition: "all 0.2s ease"
});

const dropdownStyle = (open) => ({
  maxHeight: open ? "200px" : "0px",
  overflow: "hidden",
  transition: "all 0.3s ease"
});

const titleStyle = {
  fontSize: "25px",
  fontWeight: "600",
  marginBottom: "25px",
   color: "#1d5eb3",
  letterSpacing: "0.5px"
};

export default Sidebar;
