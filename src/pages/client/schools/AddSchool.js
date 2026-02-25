import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";


function AddSchool() {
    
    const {addSchool, updateSchool, schools} = useOutletContext();

    const CLASS_OPTIONS = ["Nursery","LKG","UKG","1","2","3","4","5","6","7","8","9","10","11","12"];

    const { branchId, id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const [schoolName, setSchoolName] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [schoolOwnerMobile, setSchoolOwnerMobile] = useState("");
    const [schoolClasses, setSchoolClasses] = useState([]);
   
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

  const payload = {
    schoolName,
    schoolAddress,
    schoolOwnerMobile,
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
                            onChange={(e) => setSchoolOwnerMobile(e.target.value)}
                            required
                        />
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
                    

                    <button className="btn btn-success">Save School</button>
                </form>
            </div>
        </div>
    );
}

export default AddSchool;
