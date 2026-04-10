import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StudentList = () => {
  const students = useSelector((state) => state.students.students);

  if(students.length === 0) {
    return <p className="text-muted text-center mt-4">No students available. Please add some.</p>
  }

  return (
    <div className="mt-4 px-4">
        <div className="shadow-0 rounded-4">
            <h2 className="mb-2 fw-bold">Student List</h2>
            <ul>
                {students.map((stu) => (
                <li key={stu._id}>
                    <Link to={`/students/${stu._id}`} className="d-flex p-3">
                        <div>
                            <p className="mb-1 text-primary fw-bold">{stu.name}{" "}
                             (<small>Age: {stu.age}</small>)</p>
                        </div>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
      
    </div>
  );
};

export default StudentList;
