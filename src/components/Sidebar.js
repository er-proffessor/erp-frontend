import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
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

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [school, setSchool] = useState(false);
  const [books, setBooks] = useState(false);
  const [counter, setCounter] = useState(false);
  const [branch, setBranch] = useState({});
  // const [inventory, setInventory] = useState(false);

const profileRef = useRef(null);

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

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("counterId");
  localStorage.removeItem("branchId");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/";
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

useEffect(() => {
  function handleClickOutside(event) {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="sidebar"
      style={{
        width: "240px",
        height: "100vh",
        overflowY: "auto",
        // background: "linear-gradient(to bottom, #f1b1d0, #dbb696)",
        background: "#ffffff",
        borderRight: "1px solid #e0e0e0",
        boxShadow: "4px 0 10px rgba(130, 67, 67, 0.05)",
        padding: "20px 10px",
        transition: "all 0.3s ease"
      }}
    >
      {/* <h4 style={{ fontWeight: "700", marginBottom: "20px", color: "#2e7d32" }}> */}
      
      

      {/* ERP NAME */}

      <div style={erpTitle}>
        Publication ERP Software
      </div>


      {/* PROFILE SECTION */}

      <div style={profileWrapper} ref={profileRef}>
  
  <div 
    style={profileContainer} 
    onClick={() => setShowProfileMenu(!showProfileMenu)}
  >
    <img
      src="https://i.pravatar.cc/40"
      alt="profile"
      style={profileImage}
    />

    <div style={{ flex: 1 }}>
      <div style={welcomeText}>Welcome,</div>
      <div style={userNameText}>
        {branch.branchName ? branch.branchName : "User"}
      </div>
    </div>

    {/* ARROW */}
    <FaChevronDown
      style={{
        fontSize: "12px",
        color: "#888",
        transition: "0.3s",
        transform: showProfileMenu ? "rotate(180deg)" : "rotate(0deg)"
      }}
    />
  </div>

  {/* DROPDOWN */}
  {showProfileMenu && (
    <div
  style={{
    ...profileDropdown,
    opacity: showProfileMenu ? 1 : 0,
    transform: showProfileMenu ? "translateY(0px) scale(1)" : "translateY(-10px) scale(0.98)",
    pointerEvents: showProfileMenu ? "auto" : "none"
  }}
>
      <div
        style={dropdownItem}
        className="dropdownItem"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  )}

</div>

      
      {/* <h3 style={titleStyle}>
        {branch.branchName ? `Welcome, ${branch.branchName}` : "Dashboard"}
      </h3> */}

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
  gap: "12px",
  paddingTop: "0px",
  padding: "8px 18px",
  borderRadius: "6px",
  textDecoration: "none",
  color: isActive ? "#00bcd4" : "#555",
  // background: isActive ? "rgba(76, 175, 80, 0.12)" : "transparent",
  // borderLeft: isActive ? "4px solid #4CAF50" : "4px solid transparent",
  // boxShadow: isActive ? "0 4px 12px rgba(76,175,80,0.2)" : "none",
  background: "transparent",
  borderLeft: "none",
  boxShadow: "none",
  fontWeight: isActive ? "600" : "500",
  fontSize: isActive ? "20px" : "19px",
  transition: "all 0.2s ease"
});

const menuStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 22px",
  cursor: "pointer",
  borderRadius: "6px",
   fontSize: "16px",   // 🔥 change here anytime
  fontWeight: "500",
  color: "#555",
  transition: "all 0.2s ease",
};

const subNavStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px", 
  paddingLeft: "45px",
  // paddingRight: "0px",
  paddingTop: "6px",
  paddingBottom: "6px",
  marginTop: "4px",
  borderRadius: "6px",
  textDecoration: "none",
  color: isActive ? "#00bcd4" : "#777",
  // background: isActive ? "#e8f5e9" : "transparent",
  // borderLeft: isActive ? "3px solid #4CAF50" : "3px solid transparent",
  background: "transparent",
  borderLeft: "none",
  fontWeight: isActive ? "bold" : "500",
  fontSize: isActive ? "16px" : "15px",
  transition: "all 0.2s ease"
});

const dropdownStyle = (open) => ({
  maxHeight: open ? "200px" : "0px",
  overflow: "hidden",
  transition: "all 0.3s ease"
});

// const titleStyle = {
//   fontSize: "18px",
//   fontWeight: "600",
//   marginBottom: "25px",
//    color: "#222",
//   letterSpacing: "0.5px"
// };

const profileContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
  paddingBottom: "15px",
};

const profileImage = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover"
};

const welcomeText = {
  fontSize: "14px",
  color: "#999"
};

const userNameText = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#333"
};

const erpTitle = {
  fontSize: "22px",
  fontWeight: "600",
  color: "#00bcd4",
  marginBottom: "15px",
  marginTop: "2px",
   borderBottom: "1px solid #eee"
};

const profileWrapper = {
  position: "relative",
  // marginBottom: "5px",
  // paddingBottom: "5px",
  // borderBottom: "1px solid #eee"
};

const profileDropdown = {
  position: "absolute",
  top: "60px",
  left: "0",
  width: "180px",
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "6px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  zIndex: "100",
  transition: "all 0.25s ease"
};

const dropdownItem = {
  padding: "10px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.2s"
};

export default Sidebar;
