import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";

function CreateClient(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        branchName : "",
        mobile: "",
        email: "",
        address: "",
        password: ""

    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            await API.post(
                                "/api/branches/register", 
                                formData,
                                { 
                                    headers: {
                                                Authorization: `Bearer ${token}`
                                            }
                                }
                            );
                            alert("Client Registered Successfully");
                            navigate("/super-admin/admin-dashboard");
    
            }
            catch(error){
                alert(error.response?.data?.message || "something went wrong");
            }

    };

    return(
        <div className="container mt-4">
            <h3>Create New Client</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Publication Name</label>
                    <input type="text" name="branchName" className="form-control" onChange={handleChange} required /> 
                </div>
                <div className="mb-3">
                    <label>Mobile No.</label>
                    <input type="text" name="mobile" className="form-control" onChange={handleChange} required /> 
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required /> 
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" onChange={handleChange} required /> 
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required /> 
                </div>
                <button className="btn btn-primary">Register Client</button>
            </form>
        </div>
    );
}

export default CreateClient;
