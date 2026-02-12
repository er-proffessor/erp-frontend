import {Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";


function SchoolsList() {
  const { branchId } = useParams();
    const { schools = [] } = useOutletContext() || {};

    console.log(schools);

  return (
    <div className="container-fluid">
        <div className="card-header d-flex justify-content-between">
        <span className="fw-bold">Schools List</span>
        <Link
          to={`/branches/${branchId}/schools/add`}
          className="btn btn-sm btn-primary">
          + Add School
        </Link>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>School Name</th>
                <th>Address</th>
                <th>Owner Mobile</th>
                <th>Classes</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {schools.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No schools found
                  </td>
                </tr>
              ) : (
                schools.map((school, index) => (
                  <tr key={school._id}>
                    <td>{index + 1}</td>
                    <td>{school.schoolName}</td>
                    <td>{school.schoolAddress}</td>
                    <td>{school.schoolOwnerMobile}</td>
                    {/* <td>
                      {school.classes.map((cls, i) => (
                        <span key={i} className="badge bg-secondary me-1">
                          {cls}
                        </span>
                      ))}
                    </td> */}
                    <td>{school.schoolClasses?.join(", ")}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        ✏️
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SchoolsList;
