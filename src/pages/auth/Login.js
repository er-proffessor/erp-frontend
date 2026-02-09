import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import API from "../../config/api";

import "../../assets/css/auth.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
          const response = await API.post(
            "/api/auth/login",
            {email, password}
          );

          const {token, role, branchId} = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("branchId", branchId );

          // Role Based Redirect

          if(role === "SUPER_ADMIN"){
            navigate("/super-admin/admin-dashboard");
          }
          else if(role === "CLIENT"){
            navigate(`/branches/${branchId}`);
          }

        } 
        catch(error){
          alert(error.response?.data?.message || "Login Failed");
        }
        finally{
          setLoading(false);
        }
        
    };


  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="card login-card shadow">
        <div className="card-body">
          <h4 className="text-center mb-4">Publication ERP Login</h4>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
             {loading? "Logging in..." :  "Login"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;