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

  const role = localStorage.getItem("role");
  const counterId = localStorage.getItem("counterId");

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
    if (branchId && role !== "COUNTER") fetchBranchDetails();
  }, [branchId, fetchBranchDetails, role]);

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
            width: "210px",
            height: "100vh",
            overflowY: "auto",
            background: "#ffffff",
            borderRight: "1px solid #e6e6e6",
            boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
            padding: "18px 14px",
          }}
        >

      
      {/* ERP NAME/Title */}

      <div style={erpTitle}> Publication ERP Software </div>


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
            {/* {branch.branchName ? branch.branchName : "User"} */}
            {role === "COUNTER"? "Counter User" : branch.branchName || "User"}
          </div>
    </div>

    {/* ARROW */}
      <FaChevronDown
      style={{
        fontSize: "12px",
        color: "#999",
        marginLeft: "auto",
        transition: "0.3s",
        transform: showProfileMenu ? "rotate(180deg)" : "rotate(0deg)"
      }}
    />
  </div>

  {/* DROPDOWN */}
  {/* {showProfileMenu && (
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

</div> */}

{showProfileMenu && (
          <div style={profileDropdown}>
            <div style={dropdownItem} onClick={handleLogout}>
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
            to={role === "COUNTER"
                ? `/branches/${branchId}/counter-dashboard`
                :`/branches/${branchId}`}
            style={navStyle}
          >
            <FaHome style={iconStyle}/> Dashboard
          </NavLink>
        </li>

        {role !== "COUNTER" && (
        <>
        {/* SCHOOL */}
        <li className="nav-item mb-2">
          {/* <div onClick={toggleSchool}  className="menu-hover" style={menuStyle}>
            <FaSchool style={{ minWidth: "18px" }} /> School {school ? <FaChevronUp /> : <FaChevronDown />}
          </div> */}

            <div onClick={toggleSchool} className="menu-hover" style={menuStyle}>
  
  <div style={menuLeft}>
    <FaSchool style={iconStyle} />
    <span>School</span>
  </div>

  {school ? <FaChevronUp style={arrowStyle} /> : <FaChevronDown style={arrowStyle} />}

</div>

          <div style={dropdownStyle(school)}>
            <NavLink to={`/branches/${branchId}/schools`} style={subNavStyle}>
              <FaList style={iconStyle}/>School List
            </NavLink>
            <NavLink to={`/branches/${branchId}/schools/add`} style={subNavStyle}>
              <FaPlusCircle style={iconStyle}/>Add School
            </NavLink>
          </div>
        </li>

        {/* BOOKS */}
        <li className="nav-item mb-2">
          <div onClick={toggleBooks}  className="menu-hover" style={menuStyle}>
            <div style={menuLeft}>
            <FaBook style={iconStyle}/> 
            <span>Books</span>
            </div> 
            {books ? <FaChevronUp style={arrowStyle}/> : <FaChevronDown style={arrowStyle}/>}
</div>

          <div style={dropdownStyle(books)}>
            <NavLink to={`/branches/${branchId}/books`} style={subNavStyle}>
              <FaList style={iconStyle}/>Books List
            </NavLink>
            <NavLink to={`/branches/${branchId}/books/add`} style={subNavStyle}>
              <FaPlusCircle style={iconStyle}/>Add Books
            </NavLink>
          </div>
        </li>

        {/* COUNTERS */}
        <li className="nav-item mb-2">
          <div onClick={toggleCounter}  className="menu-hover"style={menuStyle}>
           <div style={menuLeft}>
            <FaUsers style={iconStyle}/> 
            <span>Counters </span>
            </div>
            {counter ? <FaChevronUp style={arrowStyle}/> : <FaChevronDown style={arrowStyle}/>}
          </div>

          <div style={dropdownStyle(counter)}>
            <NavLink to={`/branches/${branchId}/counters`} style={subNavStyle}>
              <FaList style={iconStyle}/>Counters List
            </NavLink>
            <NavLink to={`/branches/${branchId}/counters/add`} style={subNavStyle}>
              <FaPlusCircle style={iconStyle} />Add Counter
            </NavLink>
            <NavLink to={`/branches/${branchId}/counter-stock/assign`} style={subNavStyle}>
              <FaBoxes style={iconStyle}/>Assign Books
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
       </>
        )}

                {/* COUNTER MENU */}
                {role === "COUNTER" && (
                  <>
                    <li className="nav-item mb-2">
                      <NavLink
                        to={`/branches/${branchId}/counter/${counterId}/sell`}
                        style={navStyle}
                      >
                        <FaBook style={iconStyle} /> Sell Book
                      </NavLink>
                    </li>

                    <li className="nav-item mb-2">
                      <NavLink
                        to={`/branches/${branchId}/counter/${counterId}/orders`}
                        style={navStyle}
                      >
                        <FaList style={iconStyle} /> Order History
                      </NavLink>
                    </li>
                  </>
                )}

      </ul>
    </div>
  );
}


const navStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 14px",
  borderRadius: "8px",
  textDecoration: "none",
  color: isActive ? "#00bcd4" : "#444",
  background: isActive ? "#f3fcfe" : "transparent",
  fontWeight: isActive ? "600" : "500",
  fontSize: "15px",
  transition: "0.2s",
});


const menuStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "9px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
  color: "#444",
  transition: "0.2s",
};


const subNavStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "7px 14px 7px 42px",
  marginTop: "4px",
  borderRadius: "6px",
  textDecoration: "none",
  color: isActive ? "#00bcd4" : "#666",
  fontWeight: isActive ? "600" : "500",
  fontSize: "14px",
  transition: "0.2s",
});

const dropdownStyle = (open) => ({
  maxHeight: open ? "200px" : "0px",
  overflow: "hidden",
  transition: "all 0.3s ease"
});

const erpTitle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#00bcd4",
  marginBottom: "18px",
  paddingBottom: "10px",
  borderBottom: "1px solid #eee",
  letterSpacing: "0.3px"
};

const profileWrapper = {
  position: "relative",
};



const profileContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "18px",
  transition: "0.2s"
};

const profileImage = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover" // not neccessary
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
  fontSize: "14px", // not neccessary
  transition: "0.2s" // not neccessary
};

const iconStyle = {
  fontSize: "16px",
  marginRight: "6px",
};

const arrowStyle = {
  fontSize: "12px",
  color: "#888",
};

const menuLeft = {
  display: "flex",
  alignItems: "center",
  gap: "6px"
};

export default Sidebar;
