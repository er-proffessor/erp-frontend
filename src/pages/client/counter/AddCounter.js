import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddCounter() {
  const [schools, setSchools] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    schoolId: "",
  });

  const {branchId} = useParams();
  // console.log(branchId);

  useEffect(() => {
  const fetchSchools = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/branches/${branchId}/schools`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(res.data);

      setSchools(res.data);

      console.log(schools);
      

    } catch (err) {
      console.error("Fetch schools error:", err);
    }
  };

  fetchSchools();
}, [branchId]);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/api/counters/addCounter`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate(`/branches/${branchId}/counters`);
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
          placeholder="Counter Code"
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
