import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const { branchId } = useParams();
    const [branch, setBranch] = useState({});

    useEffect(() => {
        console.log("Branch Id", branchId);
        
        fetchBranchDetails();

    }, [branchId]);

    const fetchBranchDetails = async () => {
            try{
                const token = localStorage.getItem("token");

                const response = await axios.get(`http://localhost:5000/api/branches/${branchId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Branch API response:", response.data);

                setBranch(response.data.data);

            }
            catch(error){
                console.error(error);
            }
    };

    return (
        <>
            <div className="dashboard-page">

            {/* <div className="alert alert-info d-flex justify-content-between align-items-center"> */}
            <div className="mb-4">
                <h5 className="fw-bold"> Dashboard</h5>
                <small className="text-muted">
                    {branch.branchName? `${branch.branchName} / Dashboard` : "Dashboard"}
                </small>
            </div>

            {/* STATS CARDS */}
            <div className="row g-4 mb-4">
                <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="card shadow-sm text-center p-3">
                        <h6>Total Students</h6>
                        <h4 className="text-success">11</h4>
                    </div>
                </div>
            
            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card shadow-sm text-center p-3">
                    <h6>Total Staff</h6>
                    <h4 className="text-success">1</h4>
                </div>
            </div>


            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card shadow-sm text-center p-3">
                    <h6>Total Parents</h6>
                    <h4 className="text-success">4</h4>
                </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card shadow-sm text-center p-3">
                    <h6>Pending Complaints</h6>
                    <h4 className="text-warning">4</h4>
                </div>
            </div>
            </div>
            {/* CHART PLACEHOLDER */}
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card p-3 shadow-sm" style={{ minHeight: "300px" }}>
                        <h6>Student By Gender</h6>
                        <div className="text-center text-muted mt-4">
                            (Chart will come here)
                        </div>
                    </div>
                </div>
            

            <div className="col-md-6">
                <div className="card p-3 shadow-sm" style={{ minHeight: "300px" }}>
                    <h6>Students</h6>
                    <div className="text-center text-muted mt-4">
                        (Chart will come here)
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;

