import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import BranchList from "./BranchList";


function AdminDashboard() {

    // const logout = () => {
    //     localStorage.removeItem("isLoggedIn");
    //     window.location.href = "/";
    // };

    return (
        <AdminDashboardLayout>
            <div className="container mt-5">
                {/* <button className="btn btn-danger" onClick={logout}>
                    Logout
                </button> */}

                {/* PLAN INFO */}
                <div className="alert alert-info d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="mb-1">Silver Plan Active</h5>
                        <small>50 Students / year</small><br />
                        <small>19 Active Students</small>
                    </div>
                </div>

                <BranchList />
            </div>

        </AdminDashboardLayout>
    );
}

export default AdminDashboard;
