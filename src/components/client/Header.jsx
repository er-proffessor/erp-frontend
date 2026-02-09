import React from "react";
import { FaBars, FaPowerOff, FaGlobe } from "react-icons/fa";

const Header = ({toggleSidebar}) => {
  return (
    <div className="d-flex justify-content-between align-items-center bg-white p-3 border-bottom">
      {/* Hamburger only on mobile */}

      <FaBars 
        className="d-md-none fs-4"
        style={{cursor:"pointer"}}
        onClick={toggleSidebar}

      />

      <div className="ms-auto d-flex align-item-center">
      <FaGlobe className="me-4 fs-5" />
      <FaPowerOff className="fs-5 text-danger" />
      </div>
    
    </div>
  );
};

export default Header;
