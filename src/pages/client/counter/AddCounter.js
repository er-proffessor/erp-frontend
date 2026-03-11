import { useEffect, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import usePageTitle from "../../../hooks/usePageTitle";

function AddCounter() {

  usePageTitle("Add Counter");

  // const [schools, setSchools] = useState([]);
  const { addCounter, updateCounter, schools } = useOutletContext();
 
  const [form, setForm] = useState({
  name: "",
  schoolId: "",
  schoolName: "",
  mobileNo: "",
  email: "",
  password: ""
});

const [error, setError] = useState({
  mobileNo: "",
  email: ""
});

  const { branchId, id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  // const fetchSchools = useCallback(async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const res = await API.get(
  //       `/api/branches/${branchId}/schools`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setSchools(res.data?.data || []);
  //   } catch (err) {
  //     console.error("Fetch schools error:", err);
  //   }
  // }, [branchId]);



  const fetchCounter = useCallback(async () => {
  if (!id) return;

  try {
    const token = localStorage.getItem("token");

    const res = await API.get(
      `/api/counters/single/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    const data = res.data.data;

    setForm({
      name: data.name || "",
      schoolId: data.schoolId?._id || "",
      schoolName: data.schoolId?.schoolName || "",
      mobileNo: data.mobileNo || "",
      email: data.email || "",
      password: "" // keep blank in edit
    });

  } catch (err) {
    console.error("Fetch counter error:", err);
  }
}, [id]);


  useEffect(() => {
  // if (branchId) {
  //   fetchSchools();
  // }

  if (id) {
    fetchCounter();
  }
}, [branchId, fetchCounter, id]);


//   const submitHandler = async (e) => {
//   e.preventDefault();

//   try {
//     const token = localStorage.getItem("token");

//     if (isEditMode) {

//       const payload = { ...form };

// if (!payload.password) {
//   delete payload.password;
// }

// await API.put(
//   `/api/counters/update/${id}`,
//   payload,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
// );

//     } else {

//       await API.post(
//         `/api/counters/addCounter`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//     }

//     navigate(`/branches/${branchId}/counters`);

//   } catch (error) {
//     console.error("Counter save error:", error);
//   }
// };

const submitHandler = async (e) => {
  e.preventDefault();

  if (form.mobileNo.length !== 10) {
    setError((prev) => ({
      ...prev,
      mobileNo: "Mobile number must be exactly 10 digits"
    }));
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    setError((prev) => ({
      ...prev,
      email: "Invalid email format"
    }));
    return;
  }

  let result;

  if (isEditMode) {
    const payload = { ...form };
    if (!payload.password) delete payload.password;
    result = await updateCounter(id, payload);
  } else {
    result = await addCounter(form);
  }

  if (!result?.success) {
    alert(result.message);
    return;
  }

  navigate(`/branches/${branchId}/counters`);
};

  return (
    <div className="card">
            <div className="card-header fw-bold">{isEditMode ? "Edit Counter" : "Add Counter"}</div>
            <div className="card-body">
              <form onSubmit={submitHandler} className="max-w-md">
              
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
          type="text"
          className="form-control"
          placeholder="Counter Mobile No."
          value={form.mobileNo}
          maxLength="10"
          onChange={(e) =>
            {const value = e.target.value.replace(/\D/g, "");
            setForm({ ...form, mobileNo: value });
            
            if (value.length !== 10 ){
              setError({...error, mobileNo: "Mobile Number must be 10 digit only"});
            }
            else {
              setError({...error, mobileNo: ""});
            }
          }}
         required />
         {error.mobileNo && (
          <small className="text-danger">{error.mobileNo}</small>
         )}
        </div>

          <div className="mb-3">
            <label className="form-label">Counter Email :</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Counter Login Email"
              value={form.email}
              onChange={(e) =>{
                  const value = e.target.value;
        
                setForm({ ...form, email: value });

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailRegex.test(value)){
                  setError({...error, email: "Invalid E-Mail format"});
                }
                else {
                  setError({...error, email: ""});
                }

              }}
              required
            />
            {error.email && (
              <small className="text-danger">{error.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password :</label>
            <input
              type="password"
              className="form-control"
              placeholder={isEditMode ? "Leave blank to keep existing password" : "Default Password: counter123"}
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>
      
          

        <button 
          className="btn btn-primary"
          disabled={error.mobileNo || error.email}
          >
            Save
        </button>

      </form>
      </div>
    </div>
  );
}

export default AddCounter;
