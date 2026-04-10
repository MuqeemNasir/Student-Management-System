import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, setFilter, setSortBy,  } from "../features/students/studentsSlice";
import { useEffect } from "react";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, filter, sortBy } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])  

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value))
  }

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value))
  }


  const filteredStudents = students.filter((student) => {
    if(filter === 'All') return true
    if(filter === 'Boys') return student.gender === "Male"
    if(filter === 'Girls') return student.gender === "Female"
    return true
  })

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if(sortBy === 'name') return a.name.localeCompare(b.name)
    else if(sortBy === 'marks') return b.marks - a.marks
    else if(sortBy === 'attendance') return b.attendance - a.attendance
    return 0
  })

  return (
    <div className="container mt-4">
      <h1 className="mb-4 fw-bold text-dark text-center">Class View</h1>
      <div className="row bg-white p-4 shadow-sm rounded-4 mb-4 justify-content-center">
        <div className="col-md-4 mb-3 mb-md-0">
            <label className="form-label fw-bold text-muted">Filter by Gender: </label>
            <select className="form-select" value={filter} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
            </select>
        </div>
        <div className="col-md-4">
            <label className="form-label fw-bold text-muted">Sort by: </label>
            <select className="form-select" onChange={handleSortByChange}>
                <option value="name">Name</option>
                <option value="marks">Marks</option>
                <option value="attendance">Attendance</option>
            </select>
        </div>
      </div>
      <ul >
        {sortedStudents.length === 0 ? (
            <div className="p-4 text-center text-muted">No students found matching this filter.</div>
        ) : (
            sortedStudents.map((student) => (
                <li key={student._id} className="p-3">
                        <h5 className="fw-bold">{student.name} - {student.gender} - Marks: {student.marks || 0} - Attendance: {student.attendance || 0}%</h5>
                </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default ClassView;
