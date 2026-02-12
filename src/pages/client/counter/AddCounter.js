import { useEffect, useState, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";

function AddCounter() {
  const [schools, setSchools] = useState([]);

  const [form, setForm] = useState({
    name: "",
    schoolId: "",
    schoolName: "",
    mobileNo: ""
  });

  const { branchId } = useParams();
  const navigate = useNavigate();

  const fetchSchools = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/api/branches/${branchId}/schools`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchools(res.data?.data || []);
    } catch (err) {
      console.error("Fetch schools error:", err);
    }
  }, [branchId]);

  useEffect(() => {
    if (branchId) {
      fetchSchools();
    }
  }, [branchId, fetchSchools]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/api/counters/addCounter`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/branches/${branchId}/counters`);
    } catch (error) {
      console.error("Add counter error:", error);
    }
  };

  return (
    <div className="card">
            <div className="card-header fw-bold">Add Counter</div>
            <div className="card-body">
              <form onSubmit={submitHandler} className="max-w-md">
              <div className="mb-3">
                        <label className="form-label">Counter Name:</label>
              <input
          className="form-control"
          placeholder="Counter Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
         required />
        </div>

        <div className="mb-3">
                        <label className="form-label">Mobile No. :</label>
              <input
          className="form-control"
          placeholder="Counter Mobile No."
          value={form.mobileNo}
          onChange={(e) =>
            setForm({ ...form, mobileNo: e.target.value })
          }
         required />
        </div>

          <div className="mb-3">
                        <label className="form-label">School Name:</label>
        <select
          className="form-control"
          value={form.schoolId}
          onChange={(e) => {
            const selectedSchool = schools.find((school) => school._id === e.target.value);

            setForm({ ...form, 
              schoolId: e.target.value,
              schoolName: selectedSchool?.schoolName || ""
            });
          }}
         >
          <option value="">Select School</option>
          {schools?.map((school) => (
            <option key={school._id} value={school._id}>
              {school.schoolName}
            </option>
          ))}
        </select>
        </div>

        <button className="btn-primary">Save</button>
      </form>
      </div>
    </div>
  );
}

export default AddCounter;
