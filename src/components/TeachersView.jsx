import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
} from "../features/teachers/teachersSlice";
import TeacherList from "./TeacherList";
import { Link } from "react-router-dom";

const TeachersView = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.teachers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [status, dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 fw-bold text-dark">Teacher View</h1>
      <Link
        to="/teachers/add"
        className="btn btn-sm btn-warning fw-bold rounded shadow-sm px-4 py-2"
      >
        + Add New Teacher
      </Link>
      {status === "loading" && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {status === "success" && <TeacherList />}
    </div>
  );
};

export default TeachersView;
