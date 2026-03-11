import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import usePageTitle from "../../../hooks/usePageTitle";

function AddSchool() {
    
  usePageTitle("Add School");

    const {addSchool, updateSchool, schools} = useOutletContext();

    const CLASS_OPTIONS = ["Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"];

    const { branchId, id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const [schoolName, setSchoolName] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [schoolOwnerMobile, setSchoolOwnerMobile] = useState("");
    const [email, setEmail] = useState("");
    const [schoolClasses, setSchoolClasses] = useState([]);
   
    const [error, setError] = useState({
            mobile: "",
            email: ""
          });

    const toggleClass = (cls) => {
  if (schoolClasses.includes(cls)) {
    setSchoolClasses(schoolClasses.filter(c => c !== cls));
  } else {
    setSchoolClasses([...schoolClasses, cls]);
  }
};

    useEffect(() => {
  if (isEditMode && schools.length) {
    const existing = schools.find(s => s._id === id);

    if (existing) {
      setSchoolName(existing.schoolName || "");
      setSchoolAddress(existing.schoolAddress || "");
      setSchoolOwnerMobile(existing.schoolOwnerMobile || "");
      setSchoolClasses(existing.schoolClasses || []);
    }
  }
}, [id, isEditMode, schools]);


    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!/^\d{10}$/.test(schoolOwnerMobile)) {
    setError((prev) => ({
      ...prev,
      mobile: "Mobile number must be exactly 10 digits"
    }));
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError((prev) => ({
      ...prev,
      email: "Invalid email format"
    }));
    return;
  }

      const payload = {
        schoolName,
        schoolAddress,
        schoolOwnerMobile,
        email,
        schoolClasses: schoolClasses.sort((a,b)=>a.localeCompare(b))
      };

  if (isEditMode) {
    await updateSchool(id, payload);
  } else {
    await addSchool(payload);
  }

  navigate(`/branches/${branchId}/schools`);
};

    return (
        <div className="card">
            <div className="card-header fw-bold">{isEditMode ? "Edit School" : "Add School"}</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">School Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            value={schoolAddress}
                            onChange={(e) => setSchoolAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Owner Mobile No.</label>
                      <input
                        type="text"
                        className="form-control"
                        value={schoolOwnerMobile}
                        maxLength="10"
                        onChange={(e) => {

                          const value = e.target.value.replace(/\D/g, ""); // allow numbers only

                          setSchoolOwnerMobile(value);

                          if (value.length !== 10) {
                            setError({ ...error, mobile: "Mobile number must be exactly 10 digits" });
                          } else {
                            setError({ ...error, mobile: "" });
                          }

                        }}
                        required
                      />

                      {error.mobile && (
                        <small className="text-danger">{error.mobile}</small>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">E-Mail Id</label>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => {

                          const value = e.target.value;
                          setEmail(value);

                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                          if (!emailRegex.test(value)) {
                            setError({ ...error, email: "Invalid email format" });
                          } else {
                            setError({ ...error, email: "" });
                          }

                        }}
                        required
                      />

                      {error.email && (
                        <small className="text-danger">{error.email}</small>
                      )}
                    </div>


                    {/* CLASSES MULTI ADD */}
                    <div className="mb-3">
                        <label className="form-label">Classes</label>
                        <div className="border rounded p-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
    {CLASS_OPTIONS.map((cls) => (
      <div key={cls} className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={schoolClasses.includes(cls)}
          onChange={() => toggleClass(cls)}
          id={`class-${cls}`}
        />
        <label className="form-check-label" htmlFor={`class-${cls}`}>
          Class {cls}
        </label>
      </div>
    ))}
  </div>
                        </div>

                        <div className="mt-2">
  {schoolClasses.map((cls) => (
    <span key={cls} className="badge bg-primary me-2">
      {cls}
      <span
        style={{ cursor: "pointer", marginLeft: "6px" }}
        onClick={() => toggleClass(cls)}
      >
        ×
      </span>
    </span>
  ))}
</div>
                    

                    <button
                      className="btn btn-success"
                      disabled={error.mobile || error.email}
                      >
                      Save School
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddSchool;
