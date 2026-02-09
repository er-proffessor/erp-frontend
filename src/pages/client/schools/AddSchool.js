import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";


function AddSchool() {
    
    const {addSchool} = useOutletContext();

    const { branchId } = useParams();
    const navigate = useNavigate();

    const [schoolName, setSchoolName] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [schoolOwnerMobile, setSchoolOwnerMobile] = useState("");
    const [schoolClasses, setSchoolClasses] = useState([]);
    const [classInput, setClassInput] = useState("");

    const addClass = () => {
        if (classInput.trim() !== "") {
            setSchoolClasses([...schoolClasses, classInput]);
            setClassInput("");
        }
    };

    const removeClass = (index) => {
        setSchoolClasses(schoolClasses.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSchool = {
            schoolName,
            schoolAddress,
            schoolOwnerMobile,
            schoolClasses,
        };

       await addSchool(newSchool);
        navigate(`/branches/${branchId}/schools`);
    };

    return (
        <div className="card">
            <div className="card-header fw-bold">Add School</div>
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
                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                value={classInput}
                                onChange={(e) => setClassInput(e.target.value)}
                                placeholder="Eg: Nursery, 1, 10"
                            />
                            <button type="button" className="btn btn-primary" onClick={addClass}>
                                Add
                            </button>
                        </div>

                        <div className="mt-2">
                            {schoolClasses.map((cls, index) => (
                                <span key={index} className="badge bg-secondary me-2">
                                    {cls}
                                    <span
                                        style={{ cursor: "pointer", marginLeft: "6px" }}
                                        onClick={() => removeClass(index)}
                                    >
                                        ×
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-success">Save School</button>
                </form>
            </div>
        </div>
    );
}

export default AddSchool;
