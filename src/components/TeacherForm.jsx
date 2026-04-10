import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeacherAsync } from "../features/teachers/teachersSlice";
import { useNavigate } from "react-router-dom";

const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ name: "", subject: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTeacherAsync(formData));
    navigate("/teachers")
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6">
        <div className="card shadow-sm border-0 rounded-4 p-4">
          <h2 className="text-center mb-4 text-primary fw-bold">Add New Teacher</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Teacher Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject Taught"
                required
              />
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success w-100 rounded-pill fw-bold"
              >
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
