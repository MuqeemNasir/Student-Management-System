import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { addStudentAsync, updateStudentAsync } from "../features/students/studentsSlice"

const StudentForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const editingStudent = location.state

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        grade: "",
        gender: "Male",
        attendance: "",
        marks: ""
    })

    useEffect(() => {
        if(editingStudent){
            setFormData({
                name: editingStudent.name,
                age: editingStudent.age,
                grade: editingStudent.grade,
                gender: editingStudent.gender,
                attendance: editingStudent.attendance || "",
                marks: editingStudent.marks || "",
            })
        }
    }, [editingStudent])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(editingStudent){
            dispatch(updateStudentAsync({id: editingStudent._id, updatedStudent: formData}))
            navigate(`/students/${editingStudent._id}`)
        }else{
            dispatch(addStudentAsync(formData))
            navigate("/students")
        }
    }

    return(
        <div className="row justify-content-center mt-4">
            <div className="col-md-6">
                <div className="card shadow-sm border-0 rounded-4 p-4">
                    <h2 className="text-center mb-4 text-primary fw-bold">{editingStudent ? "Edit Student Details" : "Add New Student"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input className="form-control" type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required/><br />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <input className="form-control" type="number" id="age" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required/><br />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input className="form-control" type="text" id="grade" name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade" required/><br />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-muted fw-semibold me-3">Gender: </label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> <label className="form-check-label">Female</label>
                            </div>
                        </div>

                        {editingStudent && (
                        <div className="row bg-light p-3 rounded-3 mb-4 mx-0">
                            <div className="col-md-6 mb-2 mb-md-0">
                                <input className="form-control" type="number" name="attendance" value={formData.attendance} onChange={handleChange} placeholder="Attendance" /><br /><br />
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" type="number" name="marks" value={formData.marks} onChange={handleChange} placeholder="Marks" /><br />
                            </div>
                        </div>
                        )}

                        <div className="d-grid">
                            <button type="submit" className={`btn ${editingStudent ? "btn-success" : "btn-primary"} btn-lg rounded-pill fw-bold`}>
                                {editingStudent ? "Update Student" : "Add Student"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentForm