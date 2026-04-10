import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../features/students/studentsSlice";
import { Link } from "react-router-dom";
import StudentList from "./StudentList";

const StudentView = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.students);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 fw-bold text-dark">Student View</h1>
      <Link
        to="/students/add"
        className="btn btn-sm btn-warning fw-bold rounded shadow-sm px-4 py-2"
      >
        + Add New Student
      </Link>
      {status === "loading" && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {status === "success" && <StudentList />}
    </div>
  );
};

export default StudentView;
