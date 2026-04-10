import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteStudentAsync } from "../features/students/studentsSlice"

const StudentDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const student = useSelector((state) => state.students.students.find(s => s._id === id))

    const handleDelete = () => {
        dispatch(deleteStudentAsync(student._id))
        navigate("/students")
    }

    if(!student) return <div className="alert alert-warning mt-4 text-center">Student not found.</div>
    console.log("CURRENT STUDENT DATA: ", student);
    return(
        <div className="row justify-content-center mt-4">
            <div className="col-md-6">
                <div className="card shadow border-0 rounded-4">
                    <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
                        <h3 className="mb-0 fw-bold">Student Details</h3>
                    </div>
                    <div className="card-body p-4">
                        <ul className="list-group list-group-flush mb-4">
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="text-muted fw-semibold">Name:</span> <span>{student.name}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="text-muted fw-semibold">Age:</span> <span>{student.age}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="text-muted fw-semibold">Grade:</span> <span className="badge bg-info text-dark fs-6">{student.grade}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="text-muted fw-semibold">Gender:</span> <span>{student.gender}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="text-muted fw-semibold">Attendance:</span> <span>{student.attendance || "N/A"}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="text-muted fw-semibold">Marks:</span> <span>{student.marks || "N/A"}</span>
                            </li>
                        </ul>
                        <div className="d-flex gap-2 justify-content-center">
                            <Link to={`/students/edit/${student._id}`} state={student} className="btn btn-warning px-4 rounded-pill fw-bold">
                                Edit Details
                            </Link>
                            <button onClick={handleDelete} className="btn btn-danger px-4 rounded-pill fw-bold">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetails