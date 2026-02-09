import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function BranchList() {

  const navigate = useNavigate();

  const [branches, setBranches] = useState([
    // {
    //   id: 1,
    //   branch: "Satkar Hostel Group",
    //   mobile: "9782780925",
    //   email: "deendayal.kumawat100@gmail.com",
    //   password: "12345",
    //   address: "Jaipur Rajasthan"
    // }
  ]);

  useEffect( () => {

    fetchBranches();
  
  },[]);

  const fetchBranches = async () => {
    try{
      const token = localStorage.getItem("token");

      const response = await axios.get(
                "http://localhost:5000/api/branches/branchlist", 
                {
                 headers: {
                            Authorization: `Bearer ${token}`,
                          },
                }
            );

      setBranches(response.data.data);
    
    }
    catch(error){
      console.error(error);
    }
  };


    const goToClientDashboard = (branchId) => {
        navigate(`/api/branches/${branchId}`);
    };

  return (
    <div className="card mt-3">
      <div className="card-body">

        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success" onClick={()=>navigate("/super-admin/create-client")}>+ New Client</button>
          <input className="form-control w-25" placeholder="Search" />
        </div>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Branch</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {branches.map((item, index) => (
              <tr key={item._id} >
                <td>{index + 1}</td>
                <td style={{cursor: "pointer", color: "#0d6efd" }}
                 onClick={()=>goToClientDashboard(item._id)}>
                  {item.branchName}
                 </td>
                 <td>{item.mobile}</td>
                 <td>{item.email}</td>
                 <td>{item.address}</td>
                 <td>
                  <button className="btn btn-sm btn-warning me-1">✏</button>
                  <button className="btn btn-sm btn-danger">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default BranchList;
