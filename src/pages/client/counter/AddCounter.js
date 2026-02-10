import { useEffect, useState, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";

function AddCounter() {
  const [schools, setSchools] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    schoolId: "",
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

      setSchools(res.data);
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Counter</h2>

      <form onSubmit={submitHandler} className="max-w-md">
        <input
          className="input mb-3"
          placeholder="Counter Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <select
          className="input mb-3"
          value={form.schoolId}
          onChange={(e) =>
            setForm({ ...form, schoolId: e.target.value })
          }
        >
          <option value="">Select School</option>
          {schools.map((school) => (
            <option key={school._id} value={school._id}>
              {school.schoolName}
            </option>
          ))}
        </select>

        <button className="btn-primary">Save</button>
      </form>
    </div>
  );
}

export default AddCounter;
