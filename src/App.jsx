import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentView from "./components/StudentView";
import StudentDetails from "./components/StudentDetails";
import StudentForm from "./components/StudentForm";
import Header from "./components/Header";
import ClassView from "./components/ClassView";
import SchoolView from "./components/SchoolView";
import TeachersView from "./components/TeachersView";
import TeacherForm from "./components/TeacherForm";

function App() {
  return (
    <Router>
      <div className="bg-light min-vh-100 pb-5">
        <Header />
        <div className="container">
        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/students" element={<StudentView />} />
          <Route path="/students/add" element={<StudentForm />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/edit/:id" element={<StudentForm />} />
          <Route path="/classes" element={<ClassView />} />
          <Route path="/school" element={<SchoolView />} />
          <Route path="/teachers" element={<TeachersView />} />
          <Route path="/teachers/add" element={<TeacherForm />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
