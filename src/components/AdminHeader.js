
function AdminHeader() {

  
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";

    // localStorage.clear();
    // navigate("/");

  };

  return (
    
      <nav className="navbar navbar-light bg-white border-bottom px-4">
        <span className="fw-bold">General Publication</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          

          <button className="btn btn-outline-danger btn-sm" style={{bgcolor: "#9955ee"}} onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    
  );
}

export default AdminHeader;
