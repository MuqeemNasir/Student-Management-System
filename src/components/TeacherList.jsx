import { useDispatch, useSelector } from "react-redux";
import { deleteTeacher } from "../features/teachers/teachersSlice";

const TeacherList = () => {
  const dispatch = useDispatch();
  const { teachers, status } = useSelector((state) => state.teachers);

  if (status === "loading") {
    return (
      <p className="text-center mt-4 text-dark fw-bold">Loading Teachers...</p>
    );
  }

  if (teachers.length === 0) {
    return (
      <p className="text-muted text-center mt-4">
        No Teachers available. Please add some.
      </p>
    );
  }

  return (
    <div className="mt-4 px-4">
      <div className="shadow-0 rounded-4">
        <h2 className="mb-2 fw-bold">Teachers List</h2>
        <ul>
          {teachers.map((teach) => (
            <li key={teach._id}>
              <div>
                <p className="mb-1 text-primary fw-bold">
                  {teach.name} (<small>Subject: {teach.subject}</small>){" "}
                  <button
                    onClick={() => dispatch(deleteTeacher(teach._id))}
                    className="btn btn-sm btn-danger rounded-pill px-3 fw-bold"
                  >
                    Delete
                  </button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherList;
